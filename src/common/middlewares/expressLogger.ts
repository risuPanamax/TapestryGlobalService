import expressWinston from "express-winston";
import { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import config from "../loggers/config";

const httpTransport = new DailyRotateFile({
  filename: path.join(
    config.logConfig.logDirectory,
    `${config.logConfig.httpLogFile.filename}-%DATE%`
  ),
  datePattern: config.logConfig.datePattern,
  level: "http",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${level.toUpperCase()}] ${timestamp}  ${message} ${JSON.stringify(meta)}`;
    })
  ),
  maxSize: config.logConfig.httpLogFile.maxsize,
  extension: ".log",
});

const expressLogger = expressWinston.logger({
  transports: [httpTransport],
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${level.toUpperCase()}] ${timestamp} ${message} ${JSON.stringify(meta)}`;
    })
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms {{res.getHeader('Content-Length')}}bytes",
  expressFormat: true,
  colorize: false,
  requestWhitelist: ["body"],
  responseWhitelist: ["body"],

  dynamicMeta: (req, res) => {
    return { requestId: req.requestId };
  },
});


module.exports = expressLogger;
