import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./router";
import logger from "./logger";
import { Request, Response, NextFunction } from "express";
import { errorMiddleware } from "../middlewares/error-handler";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(fileUpload());

app.use(express.static("./uploads"));

app.use(function (req: Request, res: Response, next: NextFunction) {
  logger.info(`[${req.method}] ${req.baseUrl}${req.url}`);
  next();
});

router(app);
app.use(errorMiddleware as unknown as ErrorRequestHandler);

export default app;
