import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { randomBytes } from "crypto";
import db from "@/db";
import { users, roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const validateSession = async (session: string) => {};

export default new Elysia({
  tags: ["users"],
  prefix: "/users",
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
  .get("/", async () => {
    const users = await db.query.users.findMany();
    return users;
  })
  .get("/:id", async ({ params }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, params.id),
    });
    return user;
  })
  .put(
    "/:id",
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
  .delete("/:id", async ({ params, error }) => {
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
    async ({ body: { username, email, password }, error }) => {
      const user = await db.transaction(async (tx) => {
        let user = await tx.query.users.findFirst({
          where: eq(users.username, username),
        });

        if (user) {
          throw error(400, { msg: "User already exists" });
        }

        const salt = randomBytes(32).toString("hex");

        const hash = await Bun.password.hash(password + salt, {
          algorithm: "argon2id",
          memoryCost: 4,
          timeCost: 3,
        });

        const role = await tx.query.roles.findFirst({
          where: eq(roles.name, "member"),
        });

        [user] = await tx
          .insert(users)
          .values({
            username,
            email,
            password: hash,
            salt,
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
    async ({
      body: { username, password },
      jwt,
      cookie: { session },
      error,
    }) => {
      const user = await db.transaction(async (tx) => {
        const user = await tx.query.users.findFirst({
          where: eq(users.username, username),
        });

        if (!user) {
          throw error(400, { msg: "User not found" });
        }

        const verify = await Bun.password.verify(
          password + user.salt,
          user!.password
        );

        if (!verify) {
          throw error(400, { msg: "Incorrect username or password" });
        }

        await tx
          .update(users)
          .set({ last_login: new Date() })
          .where(eq(users.id, user.id));

        session.set({
          value: await jwt.sign({ user_id: user.id, role_id: user.role_id! }),
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
  .post("verify", async ({ jwt, set, cookie: { session } }) => {
    const key = await jwt.verify(session.value);

    if (!key) {
      set.status = 401;
      return "Unauthorized";
    }

    return { msg: "Verified!", key };
  })
  .get("logout", async ({ cookie: { session } }) => {
    session.remove();
    return "Signed out";
  });
