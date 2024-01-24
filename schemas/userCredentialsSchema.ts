import * as v from "valibot";

export const userCredentialsSchema = v.object({
  providerId: v.string([v.minLength(1)]),
  providerUserId: v.string([v.minLength(1)]),
  password: v.string([v.minLength(1)]),
});

export type UserCredentials = v.Output<typeof userCredentialsSchema>;
