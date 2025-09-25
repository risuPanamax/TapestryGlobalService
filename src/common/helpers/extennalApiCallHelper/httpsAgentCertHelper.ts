import axios, { AxiosInstance } from "axios";
import https from "https";
import fs from "fs";
import path from "path";
import { debugLogger, errorLogger } from "../../loggers";

const MODULE = "HTTPS_AGENT_CERT_HELPER";
const CERT_PATH = path.join(process.cwd(), "repository", "cert", "_.a.run.app.pem");

/**
 * Creates an Axios instance with HTTPS agent and cert
 */
export const createHttpClient = (requestId: string): AxiosInstance => {
  try {
    let httpsAgent: https.Agent;

    if (fs.existsSync(CERT_PATH)) {
      debugLogger(`Using cert from: ${CERT_PATH}`, MODULE);
      const caCert = fs.readFileSync(CERT_PATH);
      httpsAgent = new https.Agent({
        rejectUnauthorized: true,
        ca: caCert,
      });
    } else {
      errorLogger(`Cert not found at: ${CERT_PATH}. Using default HTTPS agent.`, MODULE);
      httpsAgent = new https.Agent({ rejectUnauthorized: true });
    }

    return axios.create({ httpsAgent });
  } catch (err: any) {
    errorLogger(`Failed to create HTTP client: ${err.message}`, MODULE);
    throw err;
  }
};
