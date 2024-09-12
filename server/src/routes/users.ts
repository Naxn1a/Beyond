import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import db from "@/db";
import { users, roles, reputations } from "@/db/schema";
import { eq } from "drizzle-orm";

export default new Elysia({
  tags: ["users"],
  cookie: {
    httpOnly: true,
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRETS!,
      exp: "1d",
    })
  )
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
        const user = await db.transaction(async (tx) => {
          let user = await tx.query.users.findFirst({
            where: eq(users.id, params.id),
          });

          if (!user) {
            throw error(404, { msg: `User ${params.id} not found` });
          }

          [user] = await tx
            .update(users)
            .set(body)
            .where(eq(users.id, params.id))
            .returning();
          return user;
        });

        if (!user) {
          throw error(400, { msg: `User ${params.id} not updated` });
        }

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
        bio: t.String(),
        avatar: t.String(),
        role_id: t.String(),
        status: t.String(),
        last_login: t.Date(),
      }),
    }
  )
  .delete("users/:id", async ({ params, error }) => {
    try {
      const user = await db.transaction(async (tx) => {
        const [user] = await tx
          .delete(users)
          .where(eq(users.id, params.id))
          .returning();
        return user;
      });

      if (!user) {
        throw error(400, { msg: `User ${params.id} not deleted` });
      }

      return { msg: `User ${params.id} deleted` };
    } catch (err: any) {
      throw error(500, { msg: err.message });
    }
  })
  .post(
    "signup",
    async ({ body, error }) => {
      const user = await db.transaction(async (tx) => {
        let user = await tx.query.users.findFirst({
          where: eq(users.username, body.username),
        });

        if (user) {
          throw error(400, { msg: "User already exists" });
        }

        const hash = await Bun.password.hash(body.password, {
          algorithm: "bcrypt",
          cost: 11,
        });

        const role = await tx.query.roles.findFirst({
          where: eq(roles.name, "member"),
        });

        [user] = await tx
          .insert(users)
          .values({
            username: body.username,
            email: body.email,
            password: hash,
            role_id: role!.id,
          })
          .returning();

        return user;
      });

      if (!user) {
        throw error(400, { msg: "User not created" });
      }

      return { msg: "User created" };
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
    async ({ body, jwt, cookie: { verify }, error }) => {
      const user = await db.transaction(async (tx) => {
        const user = await tx.query.users.findFirst({
          where: eq(users.username, body.username),
        });

        if (!user) {
          throw error(400, { msg: "User not found" });
        }

        const match = await Bun.password.verify(body.password, user!.password);

        if (!match) {
          throw error(400, { msg: "Username or Password does not match" });
        }

        await tx
          .update(users)
          .set({ last_login: new Date() })
          .where(eq(users.id, user.id));

        verify.set({
          value: await jwt.sign({ user_id: user.id, role_id: user.role_id! }),
          httpOnly: true,
          maxAge: 86400,
          secure: true,
        });

        return user;
      });

      if (!user) {
        throw error(400, { msg: "User not signed in" });
      }

      return { msg: "User signed in" };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .post("verify", async ({ jwt, set, cookie: { verify } }) => {
    const user = await jwt.verify(verify.value);

    if (!user) {
      set.status = 401;
      return "Unauthorized";
    }

    return "Verified!";
  });
