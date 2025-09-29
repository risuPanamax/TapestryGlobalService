const MODULE = "AUTH_MIDDLEWARE";
import { Request, Response, NextFunction } from "express";
import { getApplicationConfig } from "./loadConfiguration";
import { ErrorConstants } from "../constant/errorConstant";
import { debugLogger, errorLogger } from "../loggers";

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];

    let errorMessage = `Authorization authHeader ${authHeader}`

    debugLogger(errorMessage, MODULE);
    // 🔑 Get latest config every time
    const appConfig = getApplicationConfig();
    const VALID_TOKEN: string | null = appConfig?.secret_key ?? null;

    if (!VALID_TOKEN) {
        errorMessage = `Missing valid token in application-config`
        errorLogger(errorMessage, null, MODULE);
        res.error(ErrorConstants.TECHNICAL_ERROR.statusCode, errorMessage)
        return;
    }

    if (!authHeader) {
        errorMessage = ErrorConstants.UNAUTHORIZED.message
        errorLogger(errorMessage, null, MODULE);
        res.error(ErrorConstants.UNAUTHORIZED.statusCode, errorMessage)
        return;
    }

    // Expect format: "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        errorMessage = ErrorConstants.UNAUTHORIZED.message
        errorLogger(errorMessage, null, MODULE);
        res.error(ErrorConstants.UNAUTHORIZED.statusCode, errorMessage)
        return;
    }

    const token = parts[1];
    if (token !== VALID_TOKEN) {
        errorMessage = ErrorConstants.FORBIDDEN.message
        errorLogger(errorMessage, null, MODULE);
        res.error(ErrorConstants.FORBIDDEN.statusCode, errorMessage)
        return; // important to used here 
    }

    debugLogger("Authorization successful", MODULE);
    next();
};
module.exports = authMiddleware
