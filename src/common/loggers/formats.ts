import { format } from "winston";

const { combine, timestamp, errors, printf } = format;

// Add requestId and module fields
export const addRequestAndModuleId = format((info) => {
    info.reqId = info.reqId || "-";
    info.module = info.module || "-";
    return info;
});

// Common log formatter
export const commonFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    errors({ stack: true }),
    addRequestAndModuleId(),
    printf(({ timestamp, level, message, reqId, module, stack, ...meta }) => {
        let log = `[${level.toUpperCase()}] ${timestamp} [${module}] [${reqId}] ${message}`;
        if (stack) log += `\nStacktrace: ${stack}`;
        if (Object.keys(meta).length) log += `\nMeta: ${JSON.stringify(meta)}`;
        return log;
    })
);

// Filters
export const applicationTransportLogFilter = format((info) =>
    ["error", "trace", "http"].includes(info.level) ? false : info
)();

export const traceTransportLogFilter = format((info) =>
    info.level === "error" ? false : info
)();
