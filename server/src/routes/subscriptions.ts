import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { subscriptions } from "@/db/schema";

export default new Elysia({
  tags: ["subscriptions"],
  cookie: {
    httpOnly: true,
  },
})
  .get("subscriptions", async () => {
    const subscriptions = await db.query.subscriptions.findMany();
    return subscriptions;
  })
  .get("subscriptions/:id", async ({ params }) => {
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.id, params.id),
    });
    return subscription;
  })
  .post(
    "subscriptions",
    async ({ body }) => {
      const subscription = await db.transaction(async (tx) => {
        const [subscription] = await tx
          .insert(subscriptions)
          .values(body)
          .returning();
        return subscription;
      });

      if (!subscription) {
        throw error(500, { msg: "create subscription failed" });
      }

      return {
        msg: "create subscription success",
        subscription_id: subscription.id,
      };
    },
    {
      body: t.Object({
        role_id: t.String(),
        user_id: t.String(),
        price: t.Integer(),
        transaction_id: t.String(),
        start_date: t.Date(),
        end_date: t.Date(),
      }),
    }
  )
  .put(
    "subscriptions/:id",
    async ({ params, body }) => {
      const subscription = await db.transaction(async (tx) => {
        const [subscription] = await tx
          .update(subscriptions)
          .set(body)
          .where(eq(subscriptions.id, params.id))
          .returning();
        return subscription;
      });

      if (!subscription) {
        throw error(500, { msg: "update subscription failed" });
      }

      return {
        msg: "update subscription success",
        subscription_id: subscription.id,
      };
    },
    {
      body: t.Object({
        role_id: t.String(),
        user_id: t.String(),
        price: t.Integer(),
        transaction_id: t.String(),
        start_date: t.Date(),
        end_date: t.Date(),
      }),
    }
  );
