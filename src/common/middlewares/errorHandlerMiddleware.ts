import { Request, Response, NextFunction } from "express";
import { UniqueConstraintError, ValidationError, ForeignKeyConstraintError } from "sequelize";
import TapestryGlobalError from "../error/tapestryGlobalError";
import { errorLogger, traceLogger } from "../loggers";
import { ErrorConstants } from "../constant/errorConstant";

// import config from "../../repository/config/application-config";
// import MobifinErrorCode from "../constant/mobifinErrorMessageConversion";

// const locale = config?.defaultLocale ?? "en";
// let translationsCache: Record<string, string> = {};

// try {
//   translationsCache = require(`../../repository/language/error/${locale}.json`);
// } catch (err) {
//   baseLogger.error(`Error translation file not found for locale: ${locale}`, {
//     module: ModuleNames.middleware.ERROR_MIDDLEWARE,
//   });
// }

// export const loadErrors = (req: Request, _res: Response, next: NextFunction) => {
//   try {
//     // Preloaded translationsCache (static import)
//     if (!translationsCache) {
//       throw new TapestryGlobalError(
//         ModuleNames.middleware.ERROR_MIDDLEWARE,
//         null,
//         500,
//         ErrorConstant.LANGUAGE_NOT_FOUND,
//         locale
//       );
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

export const ErrorHandler = (
  err: any,
  req: Request & { requestId?: string },
  res: Response,
  next: NextFunction
) => {
  const MODULE = err.MODULE || {}//ModuleNames.config.ERROR_HANDLER;
  let errorConstant: any = {};
  const args = err?.args ?? [];
  const requestId = req.requestId;

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof TapestryGlobalError) {
    errorConstant = err.errorConstant;
    // Automatically log the error when instance is created

    if (errorConstant?.errorType === ErrorConstants.TECHNICAL_ERROR.errorType) {
      traceLogger(err.stack, MODULE);
      errorLogger(err?.message,err, MODULE);
    }
    //   } else if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
    //     errorConstant = ErrorConstant.VALIDATION_ERROR;
    //     errorConstant.data = err.errors.map((e) => {
    //       let errorMessage = e.message.includes("cannot be null")
    //         ? `${e.path} is required`
    //         : e.message;
    //       return { [e.path]: errorMessage };
    //     });
    //     baseLogger.error(`ValidationError: ${JSON.stringify(errorConstant.data)}`, {
    //       module: MODULE,
    //       reqId: requestId,
    //     });
    //   } else if (err instanceof ForeignKeyConstraintError) {
    //     errorConstant = ErrorConstant.VALIDATION_ERROR;
    //     errorConstant.data = [{ [err.fields]: "Foreign key constraint violation" }];
    //     baseLogger.error(`ForeignKeyConstraintError: ${JSON.stringify(errorConstant.data)}`, {
    //       module: MODULE,
    //       reqId: requestId,
    //     });
  }
  else if (err instanceof SyntaxError) {
    // errorConstant = ErrorConstant.INVALID_JSON;
    // baseLogger.error("Bad request : SyntaxError", { module: MODULE, reqId: requestId });
    // baseLogger.trace(err.stack, { module: MODULE, reqId: requestId });
    errorLogger("Bad request : SyntaxError", err.stack, MODULE);
    traceLogger(err.stack, MODULE);
  } else {
    const uncaughtError = new Error(err.message);
    uncaughtError.stack = `${err.message}\n${err.stack}`;
    traceLogger(uncaughtError.stack, MODULE);
    // baseLogger.trace(uncaughtError.stack, { module: MODULE, reqId: requestId });
    errorConstant = {}// ErrorConstant.TECHNICAL_ERROR;
  }

  const errStatus = errorConstant?.statusCode || 400//ErrorConstant.TECHNICAL_ERROR.statusCode;
  const tapestryResponseCode = errorConstant?.tapestryResponseCode || errStatus;
  let errMsg = errorConstant?.message || {}//ErrorConstant.TECHNICAL_ERROR.message;
  const httpStatusCode = err.httpStatusCode;

  if (typeof errMsg === "string") {
    let translatedMessage: string | undefined = errMsg;

    // if (
    //   MobifinErrorCode[httpStatusCode] &&
    //   errorConstant.message === ErrorConstant.EXTERNALAPI_BUSINESS_ERROR.message
    // ) {
    //   translatedMessage = translationsCache[MobifinErrorCode[httpStatusCode]];
    // } else {
    //   translatedMessage = translationsCache[errMsg] || errMsg;
    // }

    errMsg = translatedMessage;
    if (args.length) {
      args.forEach((arg: any, i: number) => {
        errMsg = errMsg.replace(`$${i + 1}`, arg);
      });
    } else {
      errMsg = errMsg.replace(/:\s*\$\d+|\$\d+/g, "").trim();
    }
  }

  const responseData: any = {
    StatusCode: errStatus,
    TapestryResponseCode: tapestryResponseCode,
    RequestId: requestId,
    Success: false,
    ResponseMessage: errMsg,
  };

  let errorDataArray: any[] = [];
  if (Array.isArray(errorConstant?.data) && errorConstant.data.length > 0) {
    errorDataArray = errorConstant.data;
  } else if (Array.isArray(err?.data) && err.data.length > 0) {
    errorDataArray = err.data;
  }

  const uniqueErrors = [...new Set(errorDataArray)];

  if (uniqueErrors.length > 0) {
    responseData.Data = replaceUIDError(uniqueErrors);
  }

  res.status(errStatus).json(responseData);
};

const replaceUIDError = (data: any[]) => {
  return data.map((error) =>
    error.UK_UID === "UK_UID must be unique"
      ? { ...error, UK_UID: "Name already exists" }
      : error
  );
};
