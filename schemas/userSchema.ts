import * as v from "valibot";
import { userCredentialsSchema } from "./userCredentialsSchema";

export const userSchema = v.object({
  _userId: v.optional(v.string([v.length(15)])),
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

export type UserType = v.Output<typeof userSchema>;
