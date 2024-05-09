import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { githubClientId, githubClientSecret } from "~/lib/config";
import Message from "~/components/Message";
import { db } from "~/lib/db.server";
import { Prisma, User } from "@prisma/client";
import * as uuid from "uuid";
import { sessionStorage } from "~/lib/session.server";

const jsonHeaders = {
  "content-type": "application/json",
  accept: "application/json",
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/");
  }
  console.dir({ code }, { depth: null });
  console.log({
    client_id: githubClientId,
    client_secret: githubClientSecret,
    code: code,
  });

  const tokenRequest = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code: code,
      }),
    }
  );

  if (!tokenRequest.ok) {
    return { error: await tokenRequest.json() };
  }

  const token = await tokenRequest.json();
  console.dir({ token }, { depth: null });

  const userRequest = await fetch(
    "https://api.github.com/user?" +
      new URLSearchParams({
        access_token: token.access_token,
      }),
    {
      headers: {
        ...jsonHeaders,
        Authorization: [token.token_type, token.access_token].join(" "),
      },
    }
  );

  if (!userRequest.ok) {
    return { error: await userRequest.json() };
  }
  const githubUser = await userRequest.json();
  console.dir({ githubUser }, { depth: null });

  const [user] = await db.$queryRaw<{ id: string }[]>`
  insert into User (
    id,
    username,
    fullName,
    githubUserId
  )
  values (
    ${crypto.randomUUID()},
    ${githubUser.login},
    ${githubUser.name},
    ${githubUser.id}
  )
  on conflict (githubUserId) do update set username = excluded.username, fullName = excluded.fullName
  returning id
  `;

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  session.set("auth", {
    userId: user.id,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
  });

  return redirect("/", {
    headers: {
      "set-cookie": await sessionStorage.commitSession(session),
    },
  });
};

export default function GithubAuthCallback() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <Message type="error">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Message>
  );
}
