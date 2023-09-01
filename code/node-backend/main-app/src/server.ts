import * as express from "express";
import { initEndpoints } from "./endpoints";
import dotenv from "dotenv";

export function initServer(): void {
  dotenv.config();
  const port = process.env.API_PORT;

  const app = express.default();

  app.use(express.json());
  app.use(initEndpoints().router);

  app.listen(port);

  console.log(`Main app started at http://localhost:${port}`);
}
