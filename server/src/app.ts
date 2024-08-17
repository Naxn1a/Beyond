import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { user } from "./routes/user";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(user)
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/helloworld", () => "Hello, World!")
  .listen(3000);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
