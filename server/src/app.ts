import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import * as r from "./routes";

export const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onParse(({ request, contentType }) => {
    if (contentType === "application/json") {
      return request.json();
    }
  })
  .group("/api/v1", (api) => {
    return api
      .use(r.users)
      .use(r.reputations)
      .use(r.posts)
      .use(r.threads)
      .use(r.replies)
      .use(r.subscriptions)
      .use(r.transactions)
      .use(r.reports);
  })
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/helloworld", () => "Hello, World!")
  .listen(3579);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
