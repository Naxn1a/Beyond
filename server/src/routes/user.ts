import { Elysia, t } from "elysia";
import db from "@/db";
import { users, roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export default new Elysia({
  tags: ["users"],
  cookie: {
    httpOnly: true,
  },
})
  .get("users", async () => {
    const users = await db.query.users.findMany();
    return users;
  })
  .get("users/:id", async ({ params }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, params.id),
    });
    return user;
  })
  .put(
    "users/:id",
    async ({ params, body, error }) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.id, params.id),
        });

        if (!user) {
          throw error(404, { msg: `User ${params.id} not found` });
        }

        await db
          .update(users)
          .set(body)
          .where(eq(users.id, params.id))
          .returning();

        return { msg: `User ${params.id} updated` };
      } catch (err: any) {
        throw error(500, { msg: err.message });
      }
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
        role_id: t.Number(),
        status: t.String(),
        last_login: t.Date(),
        updated_at: t.Date(),
      }),
    }
  )
  .delete("users/:id", async ({ params, error }) => {
    try {
      const user = await db
        .delete(users)
        .where(eq(users.id, params.id))
        .returning();

      if (user.length === 0) {
        throw error(404, { msg: `User ${params.id} not found` });
      }

      return { msg: `User ${params.id} deleted` };
    } catch (err: any) {
      throw error(500, { msg: err.message });
    }
  })
  .post(
    "signup",
    async ({ body, error }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.username, body.username),
      });

      if (user) {
        throw error(400, { msg: "User already exists" });
      }

      const hash = await Bun.password.hash(body.password, {
        algorithm: "bcrypt",
        cost: 11,
      });

      const role_id = await db.query.roles.findFirst({
        where: eq(roles.name, "user"),
      });

      const newUser = await db.insert(users).values({
        username: body.username,
        email: body.email,
        password: hash,
        role_id: role_id!.id,
      });
      return { newUser };
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "signin",
    async ({ body, error }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.username, body.username),
      });

      if (!user) {
        throw error(400, { msg: "User not found" });
      }

      const match = await Bun.password.verify(body.password, user!.password);

      if (!match) {
        throw error(400, { msg: "Username or Password does not match" });
      }

      return { user };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .post("verify", async ({ body, error }) => {});
