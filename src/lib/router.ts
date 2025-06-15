import { Application } from "express";
import fileRouter from "../res/files/file.router";
import tokenRouter from "../res/tokens/token.router";

export default function router(app: Application) {
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
  });
  app.use("/token", tokenRouter);
  app.use("/f", fileRouter);
}
