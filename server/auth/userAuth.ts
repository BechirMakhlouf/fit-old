import { UserCredentials } from "@/schemas/userCredentialsSchema";
import { User } from "@/schemas/User";
import { luciaAuth } from "./auth";
import { Cookie, GlobalDatabaseUserAttributes, Key, Session } from "lucia";
import { formatDateForMySQL, formatDateTimeForMySQL } from "@/utils/format";
import { db } from "../db";

export class UserAuth {
  private constructor() {}

  static auth = luciaAuth;

  static async registerUser(
    user: User,
  ): Promise<string> {
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
  }

  // async getId(): Promise<string> {
  //   if (this._userId) return this._userId;
  //   const id: string = await UserAuth.getUserIdFromCredentials(
  //     this.credentials,
  //   );
  //   this._userId = id;
  //   return this._userId;
  // }

  static async injectIdIntoUser(user: User): Promise<User> {
    const id: string = await this.getUserIdFromCredentials(user.credentials);
    user.userId = id;
    return user;
  }

  static async getUserIdFromCredentials(
    userCredentials: UserCredentials,
  ): Promise<string> {
    const key: Key = await this.auth.useKey(
      userCredentials.providerId,
      userCredentials.providerUserId,
      userCredentials.password,
    );

    return key.userId;
  }
  static async createNewSession(userId: string): Promise<Session> {
    const session: Session = await UserAuth.auth.createSession({
      userId: userId,
      attributes: {},
    });

    return session;
  }

  static async createSessionCookie(session: Session): Promise<Cookie> {
    const sessionCookie: Cookie = UserAuth.auth.createSessionCookie(session);
    return sessionCookie;
  }

  static async getUserFromCredentials(
    userCredentials: UserCredentials,
  ): Promise<User> {
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
  }
}
