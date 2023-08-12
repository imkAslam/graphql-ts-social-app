import express, { Express, Response } from "express";

const app: Express = express();

app.get("/", async (_, res: Response) => {
  return res.send('"Express + TypeScript Server"');
});

export default app;
