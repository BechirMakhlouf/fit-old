import { User } from "@/schemas/userSchema";
import { UserCredentials } from "@/schemas/userCredentialsSchema";
import { auth } from "./auth";

export const createUser = async function createUser(
  user: User,
  userCredentials: UserCredentials,
) {
  const { userId } = await auth.createUser({
    key: {
      providerId: userCredentials.providerId,
      providerUserId: userCredentials.providerUserId,
      password: userCredentials.password,
    },
    attributes: {
      first_name: user.firstName as string,
      last_name: user.lastName as string,
      username: user.userName,
      // birthday: user.birthday.toISOString().split("T")[0],
      // created_at: ,
      // last_visited: user.last_visited.toISOString(),
    },
  });
};
