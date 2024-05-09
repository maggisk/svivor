import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import { z } from "zod";
import { db } from "./db.server";

const schema = z
  .object({
    auth: z
      .object({
        userId: z.string(),
        expiresAt: z.number(),
      })
      .optional(),
  })
  .optional();

type SessionData = z.infer<typeof schema>;

let cookie = createCookie("session", {
  path: "/",
  sameSite: "lax",
});

export const sessionStorage = createCookieSessionStorage({
  cookie,
});

export const getUser = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const data: SessionData = session.data;
  console.log('dta', data);

  if (data.auth?.userId && data.auth.expiresAt > Date.now()) {
    return db.user.findFirst({
      select: { id: true, username: true, fullName: true },
      where: { id: data.auth.userId },
    });
  }
};
