import { commonHelper } from '../../common/helpers/extennalApiCallHelper/commonRestHelper';
import { externalApiService } from '../../common/services/externalApiService';
import  magicBuilderEndPoints  from '../constant/magicBuilderApiEndpoint';
import { ConversationDetail } from '../models/conversationDetail';

// const createConversations = (conversionDto:any) => { }
interface IConversationDetail {
  ConversationId: string;
  Message: string;
}

export { ConversationDetail };

const createConversations = async (conversionDto?: ConversationDetail): Promise<any> => {

    const apiEndPoint = magicBuilderEndPoints.CONVERSIONS;
    const apiMethod = "2";
    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    }

    //1. external API call
    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);

    //2. Call openturf API
    const apiData = await commonHelper(externalApiData, apiEndPoint);
    //3. send API response

    return apiData.data;
};

const sendMessage = async (conversionDto: IConversationDetail): Promise<any> => {

    const apiEndPoint = magicBuilderEndPoints.CONVERSIONS_SEND_MESSAGE;
    const apiMethod = "2";
    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    }

    //1. external API call
    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);
    console.log("---externalApiData---",externalApiData);
    
    //2. Call openturf API
    const apiData = await commonHelper(externalApiData, apiEndPoint);
    console.log("---apiData---",apiData);
    //3. send API response

    return apiData.data;
};
// const getBPMN = () => { }
const getBPMN = async (conversionDto?: ConversationDetail): Promise<any> => {
    const apiEndPoint = magicBuilderEndPoints.CONVERSIONS_GET_BPMN_XML;
    const apiMethod = "1";
    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    }

    //1. external API call
    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);
    console.log("---externalApiData---", externalApiData);

    //2. Call openturf API
    const apiData = await commonHelper(externalApiData, apiEndPoint);
    console.log("---apiData---", apiData);
    //3. send API response

    return apiData.data;
};


export const magicBuilderService = {
    createConversations,
    sendMessage,
    getBPMN
}