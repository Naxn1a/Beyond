import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL || "postgres://root:toor@localhost:5432/beyond";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url,
  },
  verbose: true,
  strict: true,
});
