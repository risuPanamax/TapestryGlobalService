import config from "./config";
import { createLogger, transports } from "winston";
import path from "path";
import { commonFormat } from "./formats";
import { applicationTransport, errorTransport, traceTransport, consoleTransport } from "./transports";
import { errorLogger, debugLogger, warnLogger, infoLogger, traceLogger } from "./helpers";

export const baseLogger = createLogger({
    levels: config.logConfig.levels,
    format: commonFormat,
    transports: [applicationTransport, errorTransport, traceTransport].filter(Boolean),
    exitOnError: false,
});

baseLogger.exceptions.handle(
    new transports.File({
        filename: path.join(config.logConfig.logDirectory, config.logConfig.uncaughtExceptionLogFileName.filename),
        format: commonFormat,
    })
);

process.on("unhandledRejection", (ex) => {
    throw ex;
});

if (consoleTransport) {
    baseLogger.add(consoleTransport);
}

export { errorLogger, debugLogger, warnLogger, infoLogger, traceLogger };
