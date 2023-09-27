import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as schema from "@/db/schema";
import { env } from "@/env.mjs";

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: "./migrations" });
