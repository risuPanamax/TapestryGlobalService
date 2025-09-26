import { Request, Response, NextFunction } from "express";

interface SuccessResponse<T = any> {
  StatusCode: number;
  TapestryResponseCode: number;
  RequestId?: string;
  Success: boolean;
  ResponseMessage: string;
  Data?: T;
}

declare global {
  // Extend Express Response type to include `success`
  namespace Express {
    interface Response {
      success: (
        status: number,
        message: string,
        data?: any,
        tapestryResponseCode?: number
      ) => void;
    }
  }
}

const formatSuccessResponse = <T>(
  status: number = 200,
  message: string = "Success",
  data?: T,
  requestId?: string,
  tapestryResponseCode?: number
): SuccessResponse<T> => {
  return {
    StatusCode: status,
    TapestryResponseCode: tapestryResponseCode || status,
    RequestId: requestId,
    Success: true,
    ResponseMessage: message,
    Data: data,
  };
};

const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (status, message, data, tapestryResponseCode) => {
    const requestId = (req as any).requestId; // assuming you set req.requestId earlier
    const formattedResponse = formatSuccessResponse(
      status,
      message,
      data,
      requestId,
      tapestryResponseCode
    );
    res.status(status).json(formattedResponse);
  };
  next();
};
module.exports = responseMiddleware;