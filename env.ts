import * as v from "valibot";

const envSchema = v.object({
  DB: v.object({
    DATABASE_HOST: v.string(),
    DATABASE_USERNAME: v.string(),
    DATABASE_PASSWORD: v.string(),
  }),
});

type envType = v.Output<typeof envSchema>;

const env: envType = {
  DB: {
    DATABASE_HOST: process.env.DATABASE_HOST as string,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  },
};

try {
  v.parse(envSchema, env);
} catch (e: Error) {
  console.error("environment variable invalid/missing.")
}

export default env;
