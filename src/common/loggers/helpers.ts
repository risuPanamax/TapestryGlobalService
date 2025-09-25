import { baseLogger } from "./index";
import { getRequestContext } from "../utils/requestContext";

export const errorLogger = (message: string, error: any | null, MODULE = "") => {
  const { requestId } = getRequestContext();
  baseLogger.error(
    `${message}. SQL Error: ${error?.parent?.message || "N/A"}, Error: ${error?.message || "N/A"}`,
    { module: MODULE, reqId: requestId }
  );
};

export const debugLogger = (message = "", MODULE = "") => {
  const { requestId } = getRequestContext();
  baseLogger.debug(message, { module: MODULE, reqId: requestId });
};

export const warnLogger = (message = "", MODULE = "") => {
  const { requestId } = getRequestContext();
  baseLogger.warn(message, { module: MODULE, reqId: requestId });
};

export const infoLogger = (message = "", MODULE = "") => {
  const { requestId } = getRequestContext();
  baseLogger.info(message, { module: MODULE, reqId: requestId });
};

export const traceLogger = (message = "", MODULE = "") => {
  const { requestId } = getRequestContext();
  baseLogger.log("trace", message, { module: MODULE, reqId: requestId });
};
// use this logger in tapestryGlobalError class to avoid circular dependency issue
export const tapestryGlobalErrorLogger = (
  error: any = {},
  MODULE = ""
) => {
  const { requestId } = getRequestContext();

  baseLogger.log(`Error Trace: ${JSON.stringify(error || {})} `, { module: MODULE, reqId: requestId, });
};
