import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import Exception from "../lib/Exception";
import logger from "../lib/logger";

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(error.message);
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof Exception) {
    return res.status(error.code ?? 400).json({
      message: error.message,
      code: error.code,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    code: 500,
  });
};
