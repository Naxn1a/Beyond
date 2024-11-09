import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

await pool.connect();

const db = drizzle(pool, { schema, logger: true });

export default db;
