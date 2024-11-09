import { Elysia } from "elysia";
import users from "./users";
import reputations from "./reputations";
import threads from "./threads";
import posts from "./posts";
import replies from "./replies";
import subscriptions from "./subscriptions";
import transactions from "./transactions";
import reports from "./reports";

export const route = new Elysia({
  tags: ["api"],
  prefix: "/api/v1",
})
  .use(users)
  .use(reputations)
  .use(threads)
  .use(posts)
  .use(replies)
  .use(subscriptions)
  .use(transactions)
  .use(reports);
