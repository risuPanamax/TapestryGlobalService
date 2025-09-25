const MODULE = "EXTERNAL_API_REPOSITORY";
import { debugLogger } from "../loggers";
import { SystemParameter } from "../models/SystemParameter";

const getAllSystemParam = async (): Promise<any[]> => {
    debugLogger("Fetching all system parameters", MODULE);
    return SystemParameter.findAll();
};
export const systemParamRepository = {
    getAllSystemParam,
};