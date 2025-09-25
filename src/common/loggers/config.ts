import { getApplicationConfig, getLogConfig } from "../middlewares/loadConfiguration";

const config: Record<string, any> | null = getLogConfig();
const appConfig = getApplicationConfig();

if (!config) {
    throw new Error("Logger configuration is missing. Please check your log configuration.");
}

const NODE_ENV = appConfig?.environment || "DEV";

export default {
    logConfig: config,
    NODE_ENV,
};
