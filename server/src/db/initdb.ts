import { roles, threads, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type * as schema from "./schema";

const init_roles = [
  {
    name: "admin",
  },
  {
    name: "god",
  },
  {
    name: "mvp",
  },
  {
    name: "vip",
  },
  {
    name: "member",
  },
];

const init_threads = [
  {
    title: "diary",
  },
];

export default async (db: NodePgDatabase<typeof schema>) => {
  await db.transaction(async (tx) => {
    const roleExists = await tx.query.roles.findMany();
    if (roleExists.length === 0) {
      await tx.insert(roles).values(init_roles);
    }

    const userExists = await tx.query.users.findFirst({
      where: eq(users.username, process.env.ADMIN_USERNAME!),
    });
    if (userExists) {
      const hash = await Bun.password.hash(process.env.ADMIN_PASSWORD!, {
        algorithm: "bcrypt",
        cost: 11,
      });

      const role = await tx.query.roles.findFirst({
        where: eq(roles.name, "admin"),
      });

      await tx.insert(users).values({
        username: process.env.ADMIN_USERNAME!,
        email: process.env.ADMIN_EMAIL!,
        password: hash,
        role_id: role?.id,
      });
    }

    const threadsExists = await tx.query.threads.findMany();
    if (threadsExists.length === 0) {
      await tx.insert(threads).values(init_threads);
    }
  });
};
