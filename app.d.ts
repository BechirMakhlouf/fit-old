// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./server/auth.ts").Auth;
  type DatabaseUserAttributes = {
    first_name: string;
    last_name: string;
    username: string;
    // birthday: any;
    // created_at: any;
    // last_visited: any;
  };
  type DatabaseSessionAttributes = {};
}
