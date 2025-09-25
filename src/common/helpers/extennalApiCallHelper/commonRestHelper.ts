const MODULE = "EXTERNAL_API_HELPER";
import CommonConstants from "../../constant/commonConstant";
import { debugLogger, errorLogger } from "../../loggers";
import { ExternalApiDetail } from "../../models";
import TapestryGlobalError from "../../error/tapestryGlobalError";
import { ErrorConstants } from "../../constant/errorConstant";
import { getApplicationConfig } from "../../middlewares/loadConfiguration";
import { callExternalApi } from "./httpsAgentCertHelper";

export interface ReqHeaders {
  clientId: string;
  secret: string;
  [key: string]: any;
}

/**
 * Handles GET/POST/PUT/DELETE based on ExternalApiDetail's HTTPRequestType
 */
export const commonHelper = async (apiDto: ExternalApiDetail | null, payload?: any) => {
  if (!apiDto) {
    errorLogger(`Error in commonHelper:`, null, MODULE);
    throw new TapestryGlobalError(MODULE, null, 500, ErrorConstants.TECHNICAL_ERROR);
  }

  console.log("apiDto------", apiDto);

  const { HTTPRequestType } = apiDto;

  const GET = CommonConstants.HTTP_REQUEST_TYPE.GET;
  const POST = CommonConstants.HTTP_REQUEST_TYPE.POST;
  const PUT = CommonConstants.HTTP_REQUEST_TYPE.PUT;
  const DELETE = CommonConstants.HTTP_REQUEST_TYPE.DELETE;

  const FinalUrl = createFinalURL(apiDto);
  const header = addCommonHeaders(apiDto)
  // createFinalURL
  payload = {
    FinalUrl,
    header
  };

  // return payload;
  debugLogger(`Calling commonHelper, HTTPRequestType: ${HTTPRequestType}`, MODULE);

  try {
    console.log("apiDto-----", apiDto);
    switch (HTTPRequestType) {

      case GET:
        debugLogger(`Performing GET request to ${apiDto.ApiEndPoint}`, MODULE);
        // Call your GET request handler
        return await getRequest(apiDto, payload);

      case POST:
        debugLogger(`Performing POST request to ${apiDto.ApiEndPoint}`, MODULE);
        return await postRequest(apiDto, payload);

      case PUT:
        debugLogger(`Performing PUT request to ${apiDto.ApiEndPoint}`, MODULE);
        return await putRequest(apiDto, payload);

      case DELETE:
        debugLogger(`Performing DELETE request to ${apiDto.ApiEndPoint}`, MODULE);
        return await deleteRequest(apiDto, payload);

      default:
        throw new TapestryGlobalError(MODULE, `Invalid HTTPRequestType: ${HTTPRequestType}`, 400, ErrorConstants.TECHNICAL_ERROR);
    }
  } catch (error: any) {
    errorLogger(`Error in commonHelper: ${error.message}`, error, MODULE);
    throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.TECHNICAL_ERROR);
  }
};

// Example request functions (replace with your actual restRequestHelper calls)
const getRequest = async (apiDto: ExternalApiDetail, payload: any) => {
  // implement axios GET request here
  return callExternalApi(apiDto, payload);
};
const postRequest = async (apiDto: ExternalApiDetail, payload: any) => {
  return callExternalApi(apiDto, payload);
};
const putRequest = async (apiDto: ExternalApiDetail, payload: any) => {
  return callExternalApi(apiDto, payload);
};
const deleteRequest = async (apiDto: ExternalApiDetail, payload: any) => {
  return callExternalApi(apiDto, payload);
};


/**
 * Adds the appropriate Content-Type header based on request type
 */
const addCommonHeaders = (apiDTO: ExternalApiDetail) => {
  const { RequestType } = apiDTO;
  let contentType: string = CommonConstants.CONTENT_TYPE.JSON; // default

  if (CommonConstants.EXTERNAL_API_REQUEST_TYPE.JSON === RequestType) {
    contentType = CommonConstants.CONTENT_TYPE.JSON;
  } else if (CommonConstants.EXTERNAL_API_REQUEST_TYPE.FORM === RequestType) {
    contentType = CommonConstants.CONTENT_TYPE.FORM;
  }

  const header = {
    headers: {
      "Content-Type": contentType,
    },
  };

  return header;
};

/**
 * Generates the final URL based on DTO, endpoint, and API provider
 */
const createFinalURL = (apiDTO: ExternalApiDetail): string => {
  // const createFinalURL = (apiDTO: apiDTO, apiEndPoint: string, apiProviderName: string): string => {
  const { ApiEndPoint, ApiProvider } = apiDTO;
  const appConfig = getApplicationConfig();
  if (!appConfig) {
    throw new Error("Application configuration could not be loaded.");
  }
  const apiPrefix = appConfig.ApiProvider[ApiProvider]?.ApiPrefix || "";
  const finalEndPoint = apiPrefix + ApiEndPoint;
  const finalURL = appConfig.ApiProvider[ApiProvider]?.BaseUrl + finalEndPoint;

  debugLogger(`FinalEndPoint : ${finalEndPoint}, ApiService: ${ApiProvider}`, MODULE);

  return finalURL;
};

/**
 * @deprecated
 * as of now we not supporting Mobifin Login
 * Adds Basic Authorization header for adapter requests
 */
const addAdapterAuthorizationBasicHeader = async (
  header: { headers: Record<string, string> },
  reqHeaders: ReqHeaders
) => {
  const { clientId, secret } = reqHeaders;

  if (!clientId || !secret) {
    throw new Error("Client ID or Secret missing for adapter authorization");
  }

  const base64Encoded = Buffer.from(`${clientId}:${secret}`).toString("base64");
  header.headers.Authorization = `Basic ${base64Encoded}`;

  return header;
};