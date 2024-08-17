import { Elysia, t } from "elysia";
import db from "@/db";

export const user = new Elysia({
  tags: ["users"],
  cookie: {
    httpOnly: true,
  },
})
  .get("users", () => "Get all users")
  .get("users/:id", ({ params }: { params: String }) => {})
  .put("users/:id", ({ params, body }: { params: String; body: Object }) => {})
  .delete("users/:id", ({ params }: { params: String }) => {})
  .post(
    "signin",
    async ({
      body: { username, password },
      cookie: { session },
      error,
    }: {
      body: { username: String; password: String };
      cookie: { session: String };
      error: Function;
    }) => {}
  );
