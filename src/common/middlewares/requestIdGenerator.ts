import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.requestId = uuidv4().replace(/-/g, "");
  next();
};
module.exports = requestIdMiddleware;