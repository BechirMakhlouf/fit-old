import * as v from "valibot";

import {
  UserCredentials,
} from "./userCredentialsSchema";
import { userSchema } from "./userSchema";

interface BodyMeasurements {
  arms: number[];
  chest: number;
  waist: number;
  thighs: number[];
}

export class User {
  _userId: string | null = null;
  firstName: string;
  lastName: string;
  userName: string;
  birthday: Date;
  created_at: Date;
  last_visited: Date;
  credentials: UserCredentials;
  bodyMeasurements: BodyMeasurements = {} as BodyMeasurements;
  static schema = userSchema;

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    birthday: Date,
    credentials: UserCredentials,
    created_at?: Date,
    last_visited?: Date,
    userId?: string,
    bodyMeasurements?: BodyMeasurements,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.birthday = birthday;
    this.created_at = created_at ?? new Date();
    this.last_visited = last_visited ?? new Date();
    this.credentials = credentials;
    this._userId = userId ?? null;
    this.bodyMeasurements = bodyMeasurements ?? {} as BodyMeasurements;
  }

  // async getId(): Promise<string> {
  //   if (this._userId) return this._userId;
  //   const id: string = await UserAuth.getUserIdFromCredentials(
  //     this.credentials,
  //   );
  //   this._userId = id;
  //   return this._userId;
  // }

  set userId(id: string) {
    this.userId = id;
  }

  get userId() {
    return this._userId || "";
  }

  verifyInfo(): User {
    v.parse(User.schema, this);
    return this;
  }

  updateLastVisited(date: Date = new Date()): User {
    this.last_visited = date;
    return this;
  }
}
