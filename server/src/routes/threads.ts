import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { threads } from "@/db/schema";

export default new Elysia({
  tags: ["threads"],
  prefix: "/threads",
  cookie: {
    httpOnly: true,
  },
})
  .get("/", async () => {
    const threads = await db.query.threads.findMany();
    return threads;
  })
  .get("/:id", async ({ params }) => {
    const thread = await db.query.threads.findFirst({
      where: eq(threads.id, params.id),
    });
    return thread;
  })
  .post(
    "/",
    async ({ body }) => {
      const thread = await db.transaction(async (tx) => {
        const [thread] = await tx.insert(threads).values(body).returning();
        return thread;
      });

      if (!thread) {
        throw error(400, "Thread not created");
      }

      return { msg: `Thread ${thread.id} created` };
    },
    {
      body: t.Object({
        title: t.String(),
        createBy: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const thread = await db.transaction(async (tx) => {
        const [thread] = await tx
          .update(threads)
          .set(body)
          .where(eq(threads.id, params.id))
          .returning();
        return thread;
      });

      if (!thread) {
        throw error(400, "Thread not updated");
      }

      return { msg: `Thread ${thread.id} updated` };
    },
    {
      body: t.Object({
        title: t.String(),
        createBy: t.String(),
      }),
    }
  )
  .delete("/:id", async ({ params }) => {
    const thread = await db.transaction(async (tx) => {
      const [thread] = await tx
        .delete(threads)
        .where(eq(threads.id, params.id))
        .returning();
      return thread;
    });

    if (!thread) {
      throw error(400, "Thread not deleted");
    }

    return { msg: `Thread ${params} deleted` };
  });
