import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { replies } from "@/db/schema";

export default new Elysia({
  tags: ["replies"],
  prefix: "/replies",
  cookie: {
    httpOnly: true,
  },
})
  .get("/", async () => {
    const replies = await db.query.replies.findMany();
    return replies;
  })
  .get("/:id", async ({ params }) => {
    const replie = await db.query.replies.findFirst({
      where: eq(replies.id, params.id),
    });
    return replie;
  })
  .post(
    "/",
    async ({ body }) => {
      const replie = await db.transaction(async (tx) => {
        const [replie] = await tx.insert(replies).values(body).returning();
        return replie;
      });

      if (!replie) {
        throw error(400, "Replie not created");
      }

      return { msg: `Replie ${replie.id} created` };
    },
    {
      body: t.Object({
        post_id: t.String(),
        user_id: t.String(),
        content: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const replie = await db.transaction(async (tx) => {
        const [replie] = await tx
          .update(replies)
          .set(body)
          .where(eq(replies.id, params.id))
          .returning();
        return replie;
      });

      if (!replie) {
        throw error(400, "Replie not updated");
      }

      return { msg: `Replie ${replie.id} updated` };
    },
    {
      body: t.Object({
        post_id: t.String(),
        user_id: t.String(),
        content: t.String(),
      }),
    }
  )
  .delete("/:id", async ({ params }) => {
    const replie = await db.transaction(async (tx) => {
      const [replie] = await tx
        .delete(replies)
        .where(eq(replies.id, params.id))
        .returning();
      return replie;
    });

    if (!replie) {
      throw error(400, "Replie not deleted");
    }

    return { msg: `Replie ${params.id} deleted` };
  });
