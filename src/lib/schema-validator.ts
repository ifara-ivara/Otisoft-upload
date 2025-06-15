import { envSchema } from "env-schema";

type Env = {
  PORT: number;
  BASE_URL: string;
  DB_URI: string;
  NODE_ENV: string;
};

const schema = {
  type: "object",
  required: ["PORT", "BASE_URL", "DB_URI", "NODE_ENV"],
  properties: {
    PORT: {
      type: "number",
    },
    BASE_URL: { type: "string" },
    DB_URI: { type: "string" },
    NODE_ENV: {
      type: "string",
      default: "development",
      enum: ["development", "production"],
    },
  },
};

const schemaConfig = envSchema<Env>({
  schema: schema,
  dotenv: true,
});

export default schemaConfig;
