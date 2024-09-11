import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

// init database
import initdb from "./db/initdb";

// routes
import users from "./routes/user";

initdb();

export const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onParse(({ request, contentType }) => {
    if (contentType === "application/json") {
      return request.json();
    }
  })
  .group("/api/v1", (api) => {
    return api.use(users);
  })
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/helloworld", () => "Hello, World!")
  .listen(3579);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
