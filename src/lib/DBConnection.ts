import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

export default async function connection() {
  logger.info("Establishing DB connection", config.DB_URI);
  await mongoose
    .connect(config.DB_URI)
    .then(async () => {
      logger.info("DB connection sucessful");

      // initialize services
      logger.info("Initializing services");
      logger.info("Services initialized");
    })
    .catch((err) => {
      logger.error(`DB connection failed - ${err.message}`);
    });
}
