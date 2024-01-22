// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./server/auth.ts").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
