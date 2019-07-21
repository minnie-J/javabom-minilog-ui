import { LOG_LEVEL, createLogger } from "./create-logger";

const logger = createLogger();
process.env.NODE_ENV === "development"
  ? logger.setLevel(LOG_LEVEL.DEBUG)
  : logger.setLevel(LOG_LEVEL.SILENT);

let loggerName = "logger";
while (true) {
  if (!window[loggerName]) {
    window.logger = logger;
    break;
  }

  loggerName = `${loggerName}_`;
}

export { LOG_LEVEL, createLogger, logger };
