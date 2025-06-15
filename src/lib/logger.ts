import pino from "pino";
import config from "./config";

const logger =
  config.NODE_ENV === "development"
    ? pino({
        transport: {
          target: "pino-pretty",
        },
      })
    : pino();

export default logger;
