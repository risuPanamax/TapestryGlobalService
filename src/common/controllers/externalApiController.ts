const MODULE = "EXTERNAL_API_CONTROLLER";
import asyncErrorHandler from "express-async-handler";
import { Request, Response } from "express";

import { debugLogger } from "../loggers";
import { externalApiService } from "../services/externalApiService";


const getExternalApiByApiEndPointAndHttpReqType = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { requestId } = req as any;

    debugLogger("Handling request to get all system parameters", MODULE);
        
    const Data = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(req.body);

    res.status(200).json({
      status: 200,
      message: "Success",
      Data,
    });
  }
);
export const externalApiController = {
  getExternalApiByApiEndPointAndHttpReqType,
};
