import v from "valibot";

const userSchema = v.object({
  firstName: v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
  lastName: v.string([v.regex(/[^0-9]/g, "numbers aren't allowed")]),
  userName: v.string([v.minLength(3)]),
  birthday: v.date([v.minValue(new Date(1900, 1, 1)), v.maxValue(new Date())]),
  created_at: v.date([
    v.minValue(new Date(1900, 1, 1)),
    v.maxValue(new Date()),
  ]),
  last_visited: v.date([
    v.minValue(new Date(2024, 1, 1)),
    v.maxValue(new Date()),
  ]),
});

export type User = v.Output<typeof userSchema>;
