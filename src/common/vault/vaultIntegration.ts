const MODULE = "VAULT_CONFIG";
import Vault from "node-vault";
import TapestryGlobalError from "../error/tapestryGlobalError";
import { ErrorConstants } from "../constant/errorConstant";
import { debugLogger, errorLogger } from "../loggers";
import { getApplicationConfig } from "../middlewares/loadConfiguration";

const config = getApplicationConfig();
if (!config) {
    throw new Error("Application configuration could not be loaded.");
}
let vaultClient: ReturnType<typeof Vault> | undefined;

export const initializeVaultClient = async (): Promise<void> => {
    try {
        const tokenName = config?.vault.token;
        const vaultToken = process.env[tokenName];
console.log("tokenName----------",tokenName);

vaultClient = Vault({
    endpoint: config?.vault.url,
    token: vaultToken,
    apiVersion: "v1",
});
console.log("vaultToken----------",vaultToken);

        debugLogger(`Vault client initialized`, MODULE);
    } catch (error: any) {
        errorLogger(
            `Failed to initialize vault client`, error, MODULE);
        throw new TapestryGlobalError(
            MODULE,
            error,
            error?.httpStatusCode,
            ErrorConstants.TECHNICAL_ERROR
        );
    }
}

export const getVaultClient = (): ReturnType<typeof Vault> => {
    if (!vaultClient) {
        throw new TapestryGlobalError(
            MODULE,
            new Error("Vault client not initialized"),
            500,
            ErrorConstants.TECHNICAL_ERROR
        );
    }
    return vaultClient;
}
