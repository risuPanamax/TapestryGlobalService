import express from "express";
import { systemParamController } from "../controllers/systemParameterController";
import {externalApiController} from "../controllers/externalApiController";

const commonRoutes = express.Router();

commonRoutes.get("/get-all-system-parameter", systemParamController.getAllSystemParam);
commonRoutes.get("/get-external-api", externalApiController.getExternalApiByApiEndPointAndHttpReqType);


export { commonRoutes };
