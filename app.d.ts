// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./server/auth.ts").Auth;
  type DatabaseUserAttributes = {
    first_name: string;
    last_name: string;
    username: string;
    birthday: string;
    created_at: string;
    last_visited: string;
  };
  type DatabaseSessionAttributes = {};
}
