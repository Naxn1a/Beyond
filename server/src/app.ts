import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { route } from "./routes";

export const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onParse(({ request, contentType }) => {
    if (contentType === "application/json") {
      return request.json();
    }
  })

  .use(route)
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/helloworld", () => "Hello, World!")
  .listen(3579);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
