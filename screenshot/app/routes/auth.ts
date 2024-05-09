import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { githubClientId } from "~/lib/config";

export const loader = () => {
  return redirect(
    "https://github.com/login/oauth/authorize?" +
      new URLSearchParams({
        client_id: githubClientId,
      })
  );
};
