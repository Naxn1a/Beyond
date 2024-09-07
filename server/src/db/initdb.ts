import { roles, users } from "@/db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";

export default async () => {
  await roleInit();
  await userInit();
};

const userInit = async () => {
  const userExists = await db.query.users.findFirst({
    where: eq(users.username, process.env.ADMIN_USERNAME || "root"),
  });
  if (!userExists) {
    const hash = await Bun.password.hash(process.env.ADMIN_PASSWORD || "toor", {
      algorithm: "bcrypt",
      cost: 11,
    });

    const role_id = await db.query.roles.findFirst({
      where: eq(roles.name, "admin"),
    });

    await db.insert(users).values({
      username: process.env.ADMIN_USERNAME || "root",
      email: process.env.ADMIN_EMAIL || "root@beyond.com",
      password: hash,
      role_id: role_id?.id,
    });
  }
};

const roleInit = async () => {
  const roleExists = await db.query.roles.findMany();
  if (roleExists.length === 0) {
    await db.insert(roles).values([
      {
        name: "admin",
      },
      {
        name: "user",
      },
    ]);
  }
};
