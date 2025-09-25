const MODULE = "EXTERNAL_API_REPOSITORY";
import { Op } from "sequelize";
import { ExternalApiRequestData } from "../global-interfaces-type/commonInterfaceAll";
import { debugLogger } from "../loggers";
import { ExternalApiDetail } from "../models";
import { getVisibilityStatusConditions } from "../validators/whereCluseValidtion";
import { commonHelper } from "../helpers/extennalApiCallHelper/commonRestHelper";



const getExternalApiByApiEndPointAndHttpReqType = async (
    externalApiRequestData: ExternalApiRequestData
): Promise<ExternalApiDetail | any> => {

    debugLogger("Fetching External API By Endpoint and httpType", MODULE);

    const { ApiEndPoint, HTTPRequestType } = externalApiRequestData;

    const response =  await ExternalApiDetail.findOne(
        {
            where: {
                ApiEndPoint, HTTPRequestType,
                [Op.and]: getVisibilityStatusConditions()
            },
            raw: true
        });
    return commonHelper(response)
};
export const externalApiRepository = {
    getExternalApiByApiEndPointAndHttpReqType,
};

 