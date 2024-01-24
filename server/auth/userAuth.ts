import { UserCredentials } from "@/schemas/userCredentialsSchema";
import { User } from "@/schemas/User";
import { luciaAuth } from "./auth";
import { GlobalDatabaseUserAttributes, Key } from "lucia";
import { formatDateForMySQL, formatDateTimeForMySQL } from "@/utils/format";
import { db } from "../db";

export class UserAuth {
  private constructor() {}

  static auth = luciaAuth;

  static async registerUser(
    user: User,
  ): Promise<string> {
    try {
    user.verifyInfo();
    const { userId } = await this.auth.createUser({
      key: {
        providerId: user.credentials?.providerId as string,
        providerUserId: user.credentials?.providerUserId as string,
        password: user.credentials?.password as string,
      },
      attributes: {
        first_name: user.firstName,
        last_name: user.lastName,
        username: user.userName,
        birthday: formatDateForMySQL(user.birthday),
        created_at: formatDateTimeForMySQL(user.created_at),
        last_visited: formatDateTimeForMySQL(user.last_visited),
      },
    });
    user._userId = userId;
    return userId;

    } catch (e) {
      throw new Error(`failed to register user: ${user}`)
    }
  }

  static async getUserIdFromCredentials(
    credentials: UserCredentials,
  ): Promise<string> {
    try {
      const key: Key = await this.auth.useKey(
        credentials.providerId,
        credentials.providerUserId,
        credentials.password,
      );

      return key.userId;
    } catch (e) {
      throw new Error("Couldn't find user id");
    }
  }
  static async getUserFromCredentials(
    userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const id = await this.getUserIdFromCredentials(userCredentials);

      const {
        first_name,
        last_name,
        username,
        birthday,
        last_visited,
        created_at,
      } = (await db.execute(
        `SELECT * FROM auth_user WHERE id = "${id}";`,
      ) as any).rows[0] as GlobalDatabaseUserAttributes;

      const user: User = new User(
        first_name,
        last_name,
        username,
        new Date(birthday),
        userCredentials,
        new Date(created_at),
        new Date(last_visited),
        id,
      );
      return user;
    } catch (e) {
      throw new Error("Couldn't find user");
    }
  }
}
