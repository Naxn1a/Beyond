import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { reputations } from "@/db/schema";

export default new Elysia({
  tags: ["reputations"],
  cookie: {
    httpOnly: true,
  },
})
  .get("reputations", async () => {
    const reputations = await db.query.reputations.findMany();
    return reputations;
  })
  .get("reputations/:id", async ({ params }) => {
    const reputation = await db.query.reputations.findFirst({
      where: eq(reputations.id, params.id),
    });
    return reputation;
  })
  .post(
    "reputations",
    async ({ body }) => {
      const reputation = await db.transaction(async (tx) => {
        const [reputation] = await tx
          .insert(reputations)
          .values(body)
          .returning();
        return reputation;
      });

      if (!reputation) {
        throw error(400, "Reputation not created");
      }

      return { msg: `Reputation ${reputation.id} created` };
    },
    {
      body: t.Object({
        profile_id: t.String(),
        user_id: t.String(),
      }),
    }
  )
  .delete("reputations/:id", async ({ params }) => {
    const reputation = await db.transaction(async (tx) => {
      const [reputation] = await tx
        .delete(reputations)
        .where(eq(reputations.id, params.id))
        .returning();
      return reputation;
    });

    if (!reputation) {
      throw error(400, "Reputation not deleted");
    }

    return { msg: `Reputation ${reputation.id} deleted` };
  });
