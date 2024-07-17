import { Elysia } from "elysia";

const app = new Elysia()
  .get("/helloworld", () => "Hello, World!")
  .listen(3000);

console.log(`Server running on ${app.server!.url}`);
