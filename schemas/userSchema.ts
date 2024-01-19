import v from "valibot";

const userSchema = v.object({
  firstName: v.optional(
    v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
  ),
  lastName: v.optional(
    v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
  ),
  userName: v.string([v.minLength(3)]),
  birthday: v.date([v.minValue(new Date(1900, 1, 1)), v.maxValue(new Date())]),
  email: v.string([v.email()]),
  password: v.string([v.minLength(8)]),
});

export type User = v.Output<typeof userSchema>;
