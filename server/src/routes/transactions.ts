import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { transactions } from "@/db/schema";

export default new Elysia({
  tags: ["transactions"],
  prefix: "/transactions",
  cookie: {
    httpOnly: true,
  },
})
  .get("/", async () => {
    const transactions = await db.query.transactions.findMany();
    return transactions;
  })
  .get("/:id", async ({ params }) => {
    const transaction = await db.query.transactions.findFirst({
      where: eq(transactions.id, params.id),
    });
    return transaction;
  })
  .post(
    "/",
    async ({ body }) => {
      const transaction = await db.transaction(async (tx) => {
        const [transaction] = await tx
          .insert(transactions)
          .values(body)
          .returning();
        return transaction;
      });

      if (!transaction) {
        throw error(500, { msg: "create transaction failed" });
      }

      return {
        msg: "create transaction success",
        transaction_id: transaction.id,
      };
    },
    {
      body: t.Object({
        user_id: t.String(),
        role_id: t.String(),
        price: t.Integer(),
        status: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const transaction = await db.transaction(async (tx) => {
        const [transaction] = await tx
          .update(transactions)
          .set(body)
          .where(eq(transactions.id, params.id))
          .returning();
        return transaction;
      });

      if (!transaction) {
        throw error(500, { msg: "update transaction failed" });
      }

      return {
        msg: "update transaction success",
        transaction_id: transaction.id,
      };
    },
    {
      body: t.Object({
        user_id: t.String(),
        role_id: t.String(),
        price: t.Integer(),
        status: t.String(),
      }),
    }
  );
