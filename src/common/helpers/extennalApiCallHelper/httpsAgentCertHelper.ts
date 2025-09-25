// httpsAgentCertHelper.ts
import axios, { AxiosInstance } from "axios";
import https from "https";
import fs from "fs";
import path from "path";
import { debugLogger, errorLogger } from "../../loggers";
import TapestryGlobalError from "../../error/tapestryGlobalError";
import { ErrorConstants } from "../../constant/errorConstant";

const MODULE = "HTTPS_AGENT_CERT_HELPER";

interface ExternalApiDetail {
  ApiEndPoint: string;
  Protocol: number; // 1 = HTTP, 2 = HTTPS
  CertFileName?: string;
  HTTPRequestType: number; // 1=GET, 2=POST, 3=PUT, 4=DELETE
}

interface Payload {
  FinalUrl: string;
  header?: {
    headers?: Record<string, string>;
  };
  body?: any;
}

/**
 * Creates axios client with/without cert depending on protocol
 */
const createHttpClient = (apiDto: ExternalApiDetail): AxiosInstance => {
  try {
    if (apiDto.Protocol === 2 && apiDto.CertFileName) {
      const certPath = path.join(process.cwd(), "repository", "cert", apiDto.CertFileName);
      if (fs.existsSync(certPath)) {
        debugLogger(`Using cert from: ${certPath}`, MODULE);
        const caCert = fs.readFileSync(certPath);
        const httpsAgent = new https.Agent({
          rejectUnauthorized: true,
          ca: caCert,
        });
        return axios.create({ httpsAgent });
      } else {
        errorLogger(`Protocol and CertFileName not found at: ${certPath}. Using default HTTPS agent.`, MODULE);
        throw new TapestryGlobalError(MODULE, null, 500, ErrorConstants.TECHNICAL_ERROR);
      }
    }

    // fallback → normal axios client
    return axios.create();
  } catch (error: any) {
    errorLogger(`Failed to create HTTP client: ${error.message}`, MODULE);
    throw error;
  }
};

/**
 * Calls external API using apiDto + payload
 */
export const callExternalApi = async (apiDto: ExternalApiDetail, payload: Payload) => {
  const client = createHttpClient(apiDto);

  try {
    let response;
    switch (apiDto.HTTPRequestType) {
      case 1: // GET
        response = await client.get(payload.FinalUrl, payload.header);
        break;
      case 2: // POST
        response = await client.post(payload.FinalUrl, payload.body ?? {}, payload.header);
        break;
      case 3: // PUT
        response = await client.put(payload.FinalUrl, payload.body ?? {}, payload.header);
        break;
      case 4: // DELETE
        response = await client.delete(payload.FinalUrl, payload.header);
        break;
      default:
        throw new TapestryGlobalError(MODULE, `Unsupported HTTPRequestType: ${apiDto.HTTPRequestType}`, 500, ErrorConstants.TECHNICAL_ERROR);
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    errorLogger(`API call failed`, error, MODULE);
    throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.TECHNICAL_ERROR);
  }
};
