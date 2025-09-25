import asyncErrorHandler from "express-async-handler";
import { Request, Response } from "express";

import { debugLogger } from "../loggers";
import { systemParamService } from "../services/systemParameterService";

const MODULE = "SYSTEM_PARAMETER_CONTROLLER";

const getAllSystemParam = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { requestId } = req as any;

    debugLogger("Handling request to get all system parameters", MODULE);

    const Data = await systemParamService.getAllSystemParam();

    res.status(200).json({
      status: 200,
      message: "Success",
      Data,
    });
  }
);
export const systemParamController = {
  getAllSystemParam,
};
