import db from "@/db";
import { Elysia, error, t } from "elysia";
import { eq } from "drizzle-orm";
import { reportUser, reportPost } from "@/db/schema";

export default new Elysia({
  tags: ["reports"],
  prefix: "/reports",
  cookie: {
    httpOnly: true,
  },
})
  .get("/:type", async ({ params }) => {
    if (params.type === "user") {
      const reportsUsers = await db.query.reportUser.findMany();
      return reportsUsers;
    } else if (params.type === "post") {
      const reportsPosts = await db.query.reportPost.findMany();
      return reportsPosts;
    } else {
      throw error(400, "Invalid type");
    }
  })
  .get("/:type/:id", async ({ params }) => {
    if (params.type === "user") {
      const reportUser = await db.query.reportUser.findFirst({
        where: eq(reportPost.id, params.id),
      });
      return reportUser;
    } else if (params.type === "post") {
      const reportPost = await db.query.reportPost.findFirst({
        where: eq(reportUser.id, params.id),
      });
      return reportPost;
    } else {
      throw error(400, "Invalid type");
    }
  })
  .post(
    "/:type",
    async ({ params, body }) => {
      if (params.type === "user") {
        const report_user = await db.transaction(async (tx) => {
          const [report_user] = await tx
            .insert(reportUser)
            .values(body)
            .returning();
          return report_user;
        });

        if (!report_user) {
          throw error(400, "Report user not created");
        }

        return { msg: `Report user ${report_user.id} created` };
      } else if (params.type === "post") {
        const report_post = await db.transaction(async (tx) => {
          const [report_post] = await tx
            .insert(reportPost)
            .values(body)
            .returning();
          return report_post;
        });

        if (!report_post) {
          throw error(400, "Report post not created");
        }

        return { msg: `Report post ${report_post.id} created` };
      }
    },
    {
      body: t.Object({
        user_id: t.String(),
        reported_user_id: t.String(),
        post_id: t.String(),
        reason: t.String(),
        status: t.String(),
      }),
    }
  )
  .put(
    "/:type/:id",
    async ({ params, body }) => {
      if (params.type === "user") {
        const report_user = await db.transaction(async (tx) => {
          const [report_user] = await tx
            .update(reportUser)
            .set(body)
            .where(eq(reportUser.id, params.id))
            .returning();
          return report_user;
        });

        if (!report_user) {
          throw error(400, "Report user not updated");
        }

        return { msg: `Report user ${report_user.id} updated` };
      } else if (params.type === "post") {
        const report_post = await db.transaction(async (tx) => {
          const [report_post] = await tx
            .update(reportPost)
            .set(body)
            .where(eq(reportPost.id, params.id))
            .returning();
          return report_post;
        });

        if (!report_post) {
          throw error(400, "Report post not updated");
        }

        return { msg: `Report post ${report_post.id} updated` };
      }
    },
    {
      body: t.Object({
        user_id: t.String(),
        reported_user_id: t.String(),
        post_id: t.String(),
        reason: t.String(),
        status: t.String(),
      }),
    }
  );
