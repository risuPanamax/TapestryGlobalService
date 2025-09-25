import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import { format, transports } from "winston";
import { applicationTransportLogFilter, traceTransportLogFilter } from "./formats";
import config from "./config"; // ✅ import default instead of named

// Application logs
export const applicationTransport = new DailyRotateFile({
    filename: path.join(config.logConfig.logDirectory, `${config.logConfig.applicationFile.filename}-%DATE%`),
    datePattern: config.logConfig.datePattern,
    level: config.logConfig.applicationFile.level,
    format: format.combine(applicationTransportLogFilter),
    maxSize: config.logConfig.applicationFile.maxsize,
    extension: ".log",
});

// Trace logs
export const traceTransport = new DailyRotateFile({
    filename: path.join(config.logConfig.logDirectory, `${config.logConfig.errorTraceFile.filename}-%DATE%`),
    datePattern: config.logConfig.datePattern,
    level: config.logConfig.errorTraceFile.level,
    handleExceptions: true,
    format: format.combine(traceTransportLogFilter),
    maxSize: config.logConfig.errorTraceFile.maxsize,
    extension: ".log",
});

// Error logs
export const errorTransport = new DailyRotateFile({
    filename: path.join(config.logConfig.logDirectory, `${config.logConfig.errorFile.filename}-%DATE%`),
    datePattern: config.logConfig.datePattern,
    level: config.logConfig.errorFile.level,
    maxSize: config.logConfig.errorFile.maxsize,
    extension: ".log",
});

// Console logs (only in DEV)
export const consoleTransport =
    config.NODE_ENV === "DEV"
        ? new transports.Console({
              level: config.logConfig.console.level,
              format: format.combine(
                  format.simple(),
                  format.printf(({ timestamp, level, message, stack }) => {
                      let log = `[${level.toUpperCase()}] ${timestamp} ${message}`;
                      if (stack) log += `\nStacktrace: ${stack}`;
                      return log;
                  })
              ),
          })
        : null;
