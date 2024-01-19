import { connect } from "@planetscale/database";
import env from "@/env";

const config = {
  host: env.DB.DATABASE_HOST,
  username: env.DB.DATABASE_USERNAME,
  password: env.DB.DATABASE_PASSWORD,
};

export const dbConnection = connect(config);
