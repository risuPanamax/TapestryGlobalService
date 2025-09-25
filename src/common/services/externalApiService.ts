const MODULE = "EXTERNAL_API_SERVICE";
import { debugLogger, errorLogger } from "../loggers";
import TapestryGlobalError from "../error/tapestryGlobalError";
import { ErrorConstants } from "../constant/errorConstant";
import { externalApiRepository } from "../repositories/externalApiRepository";
import { ExternalApiRequestData } from "../global-interfaces-type/commonInterfaceAll";
import { ExternalApiDetail } from "../models";



const getExternalApiByApiEndPointAndHttpReqType = async (externalApiRequestData: ExternalApiRequestData): Promise<ExternalApiDetail | null> => {
    try {
        debugLogger("Fetching all system parameters", MODULE);
        const externalApiResponse = await externalApiRepository.getExternalApiByApiEndPointAndHttpReqType(externalApiRequestData);
        return externalApiResponse;
    } catch (error: any) {
        errorLogger(`Error fetching system parameters`, error,MODULE);
        throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.TECHNICAL_ERROR);
    }
};

export const externalApiService = {
    getExternalApiByApiEndPointAndHttpReqType,
};
