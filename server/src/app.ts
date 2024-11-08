import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import users from "./routes/users";
import reputations from "./routes/reputations";
import posts from "./routes/posts";
import threads from "./routes/threads";
import replies from "./routes/replies";
import subscriptions from "./routes/subscriptions";
import transactions from "./routes/transactions";
import reports from "./routes/reports";

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
      .use(users)
      .use(reputations)
      .use(posts)
      .use(threads)
      .use(replies)
      .use(subscriptions)
      .use(transactions)
      .use(reports);
  })
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/helloworld", () => "Hello, World!")
  .listen(3579);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
