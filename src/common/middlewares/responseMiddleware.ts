import { Request, Response, NextFunction } from "express";

// ✅ Success response interface
interface SuccessResponse<T = any> {
  StatusCode: number;
  TapestryResponseCode: number;
  RequestId?: string;
  Success: boolean;
  ResponseMessage: string;
  Data?: T;
}

// ✅ Error response interface
interface ErrorResponse {
  StatusCode: number;
  TapestryResponseCode: number;
  RequestId?: string;
  Success: boolean;
  ResponseMessage: string;
  Error?: any;
}

declare global {
  namespace Express {
    interface Response {
      success: (
        status: number,
        message: string,
        data?: any,
        tapestryResponseCode?: number
      ) => void;
      error: (
        status: number,
        message: string,
        error?: any,
        tapestryResponseCode?: number
      ) => void;
    }
  }
}

// ✅ Formatters
const formatSuccessResponse = <T>(
  status: number = 200,
  message: string = "Success",
  data?: T,
  requestId?: string,
  tapestryResponseCode?: number
): SuccessResponse<T> => ({
  StatusCode: status,
  TapestryResponseCode: tapestryResponseCode || status,
  RequestId: requestId,
  Success: true,
  ResponseMessage: message,
  Data: data,
});

const formatErrorResponse = (
  status: number = 500,
  message: string = "Error",
  error?: any,
  requestId?: string,
  tapestryResponseCode?: number
): ErrorResponse => ({
  StatusCode: status,
  TapestryResponseCode: tapestryResponseCode || status,
  RequestId: requestId,
  Success: false,
  ResponseMessage: message,
  Error: error,
});

// ✅ Middleware
const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.success = (status, message, data?, tapestryResponseCode?) => {
    const requestId = (req as any).requestId;
    const formatted = formatSuccessResponse(
      status,
      message,
      data,
      requestId,
      tapestryResponseCode
    );
    res.status(status).json(formatted);
  };

  res.error = (status, message, error?, tapestryResponseCode?) => {
    const requestId = (req as any).requestId;
    const formatted = formatErrorResponse(
      status,
      message,
      error,
      requestId,
      tapestryResponseCode
    );
    res.status(status).json(formatted);
  };

  next();
};

module.exports = responseMiddleware
