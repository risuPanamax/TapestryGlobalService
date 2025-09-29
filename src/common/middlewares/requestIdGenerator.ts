import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestIdHeader = req.headers.requestid;
  const requestId = Array.isArray(requestIdHeader) ? requestIdHeader[0] : requestIdHeader;
  req.requestId = requestId || "tgs" + uuidv4().replace(/-/g, "");
  next();
};
module.exports = requestIdMiddleware;