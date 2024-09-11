import db from "@/db";
import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { posts } from "@/db/schema";

export default new Elysia({
  tags: ["posts"],
  cookie: {
    httpOnly: true,
  },
})
  .get("posts", async () => {
    const posts = await db.query.posts.findMany();
    return posts;
  })
  .get("posts/:id", async ({ params }) => {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, params.id),
    });
    return post;
  });
