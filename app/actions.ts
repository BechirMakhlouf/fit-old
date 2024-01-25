"use server";

import { User } from "@/schemas/User";
import { UserCredentials } from "@/schemas/userCredentialsSchema";
import { UserAuth } from "@/server/auth/userAuth";

export async function handleSignIn(
  state: any,
  userCredentials: UserCredentials,
): Promise<string> {
  const user: User = await UserAuth.getUserFromCredentials(userCredentials);
  return JSON.stringify(user);
}
