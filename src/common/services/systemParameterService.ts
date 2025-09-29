import { debugLogger, errorLogger } from "../loggers";
import TapestryGlobalError from "../error/tapestryGlobalError";
import { ErrorConstants } from "../constant/errorConstant";
import { systemParamRepository } from "../repositories/systemParameterRepository";

const MODULE = "SYSTEM_PARAMETER_SERVICE";

const getAllSystemParam = async (): Promise<any[]> => {
    try {
        debugLogger("Fetching all system parameters", MODULE);
        const systemData = await systemParamRepository.getAllSystemParam();
        return systemData;
    } catch (error: any) {
        errorLogger(`Error fetching system parameters`, error, MODULE);
        throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.TECHNICAL_ERROR);
    }
};

export const systemParamService = {
    getAllSystemParam,
};
