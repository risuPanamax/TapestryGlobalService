import { Router } from "express";
import { magicBuilderRoutes } from "./magicBuilderRoutes";

const magicBuilderApiRouter = Router();

magicBuilderApiRouter.use("/", magicBuilderRoutes);

export { magicBuilderApiRouter };
