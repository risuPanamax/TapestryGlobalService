export enum ErrorType {
    TECHNICAL = 1,
    BUSINESS = 2,
}

export interface ErrorConstant {
    statusCode: number;
    message: string;
    errorType: ErrorType;
    data?: any; // optional extra data like validation errors
    tapestryResponseCode?: number;
}

export const ErrorConstants = {
    TECHNICAL_ERROR: {
        statusCode: 500,
        message: "Technical error occurred while processing request",
        errorType: ErrorType.TECHNICAL,
    } as ErrorConstant,
    
    UNAUTHORIZED: {
        statusCode: 401,
        message: "Unauthorized:Invalid format or Missing token",
        errorType: ErrorType.TECHNICAL,
    } as ErrorConstant,

    FORBIDDEN: {
        statusCode: 403,
        message: "Forbidden: Invalid token",
        errorType: ErrorType.TECHNICAL,
    } as ErrorConstant,

    CACHE_MANAGER_ERROR: {
        statusCode: 500,
        message: "There is error in cache manager  while trying to set value to the cache",
        errorType: ErrorType.TECHNICAL,
    } as ErrorConstant,

    VALIDATION_ERROR: {
        statusCode: 400,
        message: "VALIDATION_ERROR",
        errorType: ErrorType.BUSINESS,
    } as ErrorConstant,

    INVALID_JSON: {
        statusCode: 400,
        message: "Bad Request",
        errorType: ErrorType.BUSINESS,
    } as ErrorConstant,

    SYSTEM_PARAMETER_NOT_FOUND: {
        statusCode: 404,
        message: "System parameter not found for alias $1",
        errorType: ErrorType.BUSINESS,
    } as ErrorConstant,
};
