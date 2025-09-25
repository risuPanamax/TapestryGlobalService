import { Request, Response, NextFunction } from "express";
import { requestContext } from "../utils/requestContext";

const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.requestId || "N/A";

  requestContext.run({ requestId }, () => {
    next();
  });
};
module.exports = requestContextMiddleware;
