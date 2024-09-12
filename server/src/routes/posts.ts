import db from "@/db";
import { Elysia, error, t } from "elysia";
import { desc, eq } from "drizzle-orm";
import { posts } from "@/db/schema";

export default new Elysia({
  tags: ["posts"],
  cookie: {
    httpOnly: true,
  },
})
  .get("posts", async ({ query }) => {
    const { limit, offset } = query;
    const post = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(parseInt(limit!))
      .offset(parseInt(offset!));
    return post;
  })
  .get("posts/:id", async ({ params }) => {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, params.id),
    });
    return post;
  })
  .post(
    "posts",
    async ({ body }) => {
      const post = await db.transaction(async (tx) => {
        const [post] = await tx.insert(posts).values(body).returning();
        return post;
      });

      if (!post) {
        throw error(500, { msg: "create post failed" });
      }
      return { msg: "create post success", post_id: post.id };
    },
    {
      body: t.Object({
        thread_id: t.String(),
        user_id: t.String(),
        title: t.String(),
        description: t.String(),
        detail: t.Object({}),
      }),
    }
  )
  .put(
    "posts/:id",
    async ({ params, body }) => {
      const post = await db.transaction(async (tx) => {
        const [post] = await tx
          .update(posts)
          .set(body)
          .where(eq(posts.id, params.id))
          .returning();
        return post;
      });

      if (!post) {
        throw error(500, { msg: `update post failed` });
      }
      return { msg: "update post success" };
    },
    {
      body: t.Object({
        thread_id: t.String(),
        user_id: t.String(),
        title: t.String(),
        description: t.String(),
        detail: t.Object({}),
      }),
    }
  )
  .delete("posts/:id", async ({ params }) => {
    const post = await db.transaction(async (tx) => {
      const [post] = await tx
        .delete(posts)
        .where(eq(posts.id, params.id))
        .returning();
      return post;
    });

    if (!post) {
      throw error(500, { msg: `delete post failed` });
    }
    return { msg: "delete post success" };
  });
