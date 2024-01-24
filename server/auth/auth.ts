// lucia.ts

import { lucia } from "lucia";
import { mysql2 } from "@lucia-auth/adapter-mysql";
import { nextjs_future } from "lucia/middleware";
import mysql from "mysql2/promise";

import env from "@/env";

// expect error (see next section)

const connectionPool = mysql.createPool(env.DB.DATABASE_URL);

export const luciaAuth = lucia({
  adapter: mysql2(connectionPool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs_future(),
  sessionCookie: { expires: false },
});

export type Auth = typeof luciaAuth;
