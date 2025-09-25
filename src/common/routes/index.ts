import { Router } from "express";
import { commonRoutes } from "./commonRoutes";

const commonApiRouter = Router();

commonApiRouter.use("/", commonRoutes);

export { commonApiRouter };
