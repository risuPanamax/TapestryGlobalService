import CommonConstants from '../../common/constant/commonConstant';
import { commonHelper } from '../../common/helpers/restApiCallHelper/commonRestHelper';
import { debugLogger } from '../../common/loggers';
import { externalApiService } from '../../common/services/externalApiService';
import  magicBuilderEndPoints  from '../constants/magicBuilderApiEndpoint';
import { ConversationDetail } from '../models/conversationDetail';
const MODULE = "CONVERSATION_SERVICE";
// const createConversations = (conversationDto:any) => { }
interface IConversationDetail {
  ConversationId: string;
  Message: string;
}

export { ConversationDetail };

const createConversations = async (): Promise<any> => {
    debugLogger("createConversations - Started", MODULE);

    const apiEndPoint = magicBuilderEndPoints.CONVERSATION;
    const apiMethod = CommonConstants.HTTP_REQUEST_TYPE.POST;

    debugLogger(`Fetching external API detail using: Endpoint=${apiEndPoint}, Method=${apiMethod}`, MODULE);

    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    };

    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);

    debugLogger("Calling commonHelper with external API", MODULE);

    const apiData = await commonHelper(externalApiData);

    debugLogger("commonHelper returned data - returning response", MODULE);

    return apiData.data;
};

const sendMessage = async (conversationDto: IConversationDetail): Promise<any> => {
    debugLogger("sendMessage - Started", MODULE);

    const apiEndPoint = magicBuilderEndPoints.CONVERSATION_SEND_MESSAGE;
    const apiMethod = CommonConstants.HTTP_REQUEST_TYPE.POST;

    debugLogger(`Fetching external API detail using: Endpoint=${apiEndPoint}, Method=${apiMethod}`, MODULE);

    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    };

    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);

    debugLogger("Calling commonHelper with external API", MODULE);

    const apiData = await commonHelper(externalApiData, conversationDto);
    debugLogger("commonHelper returned data - returning response", MODULE);

    return apiData.data;
};

// const getBPMN = async (conversationDto?: ConversationDetail): Promise<any> => {
    
//     const apiEndPoint = magicBuilderEndPoints.CONVERSATION_GET_BPMN_XML;
//     const apiMethod = CommonConstants.HTTP_REQUEST_TYPE.GET;
//     const externalApiReq = {
//         ApiEndPoint: apiEndPoint,
//         HTTPRequestType: apiMethod
//     }
    
//     //1. external API call
//     const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);

//     //2. Call openturf API
//     const apiData = await commonHelper(externalApiData, apiEndPoint);

//     //3. send API response
//     return apiData.data;
// };
const getBPMN = async (conversationDto?: ConversationDetail): Promise<any> => {
    debugLogger("getBPMN - Started", MODULE);

    const apiEndPoint = magicBuilderEndPoints.CONVERSATION_GET_BPMN_XML;
    const apiMethod = CommonConstants.HTTP_REQUEST_TYPE.GET;

    debugLogger(`Fetching external API detail using: Endpoint=${apiEndPoint}, Method=${apiMethod}`, MODULE);

    const externalApiReq = {
        ApiEndPoint: apiEndPoint,
        HTTPRequestType: apiMethod
    };

    debugLogger("Fetching external API config using endpoint and method", "conversation.service");

    const externalApiData = await externalApiService.getExternalApiByApiEndPointAndHttpReqType(externalApiReq);

   
    debugLogger("Calling commonHelper with external API", MODULE);

    const apiData = await commonHelper(externalApiData, conversationDto);
    
    return apiData.data;
};

export const magicBuilderService = {
    createConversations,
    sendMessage,
    getBPMN
}