import { UserAuth } from "@/server/auth/userAuth";
import {
  UserCredentials,
  userCredentialsSchema,
} from "./userCredentialsSchema";
import * as v from "valibot";

export class User {
  _userId: string | null = null;
  firstName: string;
  lastName: string;
  userName: string;
  birthday: Date;
  created_at: Date;
  last_visited: Date;
  credentials: UserCredentials;
  private schema = v.object({
    userId: v.optional(v.string([v.length(15)])),
    firstName: v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
    lastName: v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
    userName: v.string([v.minLength(3)]),
    birthday: v.optional(
      v.date([v.minValue(new Date("01-01-1900")), v.maxValue(new Date())]),
    ),
    // !! replace these static values
    created_at: v.optional(v.date([
      v.minValue(new Date("01-01-2024")),
      v.maxValue(new Date()),
    ])),
    last_visited: v.optional(v.date([
      v.minValue(new Date("01-01-2024")),
      v.maxValue(new Date()),
    ])),
    credentials: v.optional(userCredentialsSchema),
  });

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    birthday: Date,
    credentials: UserCredentials,
    created_at?: Date,
    last_visited?: Date,
    userId?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.birthday = birthday;
    this.created_at = created_at ?? new Date();
    this.last_visited = last_visited ?? new Date();
    this.credentials = credentials;
    this._userId = userId ?? null;
  }

  async getId(): Promise<string> {
    if (this._userId) return this._userId;
    const id: string = await UserAuth.getUserIdFromCredentials(
      this.credentials,
    );
    this._userId = id;
    return this._userId;
  }

  verifyInfo(): User {
    try {
      v.parse(this.schema, this);
      return this;
    } catch (e) {
      throw new Error(`user validation failed. ${(e as Error).message}`);
    }
  }

  updateLastVisited(date: Date = new Date()): User {
    this.last_visited = date;
    return this;
  }
}
