const MODULE = "VAULT_CALL_HELPER";
import TapestryGlobalError from "../error/tapestryGlobalError";
import { ErrorConstants } from "../constant/errorConstant";
import { errorLogger } from "../loggers";
import { getApplicationConfig, getDatabaseConfig, getLogConfig, setApplicationConfig, setDatabaseConfig, setLogConfig } from "../middlewares/loadConfiguration";
import { getVaultClient } from "./vaultIntegration";

const appConfig = getApplicationConfig();
if (!appConfig) {
    throw new Error("Application configuration could not be loaded.");
}
export async function readVaultData(secretPath: string, key: string): Promise<any> {
    try {
        const fullPath = appConfig?.vault.rootPath + secretPath;
        const secret = await getVaultClient().read(fullPath);

        return key.split(".").reduce(
            (current: any, k: string) => (current && current[k] ? current[k] : undefined),
            secret.data.data
        );
    } catch (error: any) {
        errorLogger(
            `Failed to read data from Vault. Key : ${secretPath}`, error, MODULE
        );
        throw new TapestryGlobalError(
            MODULE,
            error,
            error?.httpStatusCode,
            ErrorConstants.TECHNICAL_ERROR
        );
    }
}
export async function replaceValueFromVault(): Promise<void> {
    const appConf = getApplicationConfig();
    if (appConf) {
        setApplicationConfig(await fetchAndReplaceValueFromVault(appConf));
    }
    const logConf = getLogConfig();
    if (logConf) {
        setLogConfig(await fetchAndReplaceValueFromVault(logConf));
    }
    const dbConf = getDatabaseConfig();
    if (dbConf) {
        console.log("dbConf--------", dbConf);

        setDatabaseConfig(await fetchAndReplaceValueFromVault(dbConf));
    }
}

async function fetchAndReplaceValueFromVault<T extends object>(conf: T): Promise<T> {
    // Deep clone while preserving type
    const configWithSecrets: T = JSON.parse(JSON.stringify(conf));
    return await replaceVaultValues(configWithSecrets);
}

async function replaceVaultValues<T>(data: T): Promise<T> {
    if (Array.isArray(data)) {
        // Handle arrays
        const replaced = await Promise.all(data.map(item => replaceVaultValues(item)));
        return replaced as unknown as T;
    }

    if (typeof data === "object" && data !== null) {
        const entries = await Promise.all(
            Object.entries(data).map(async ([key, value]) => {
                if (typeof value === "string" && value.startsWith("vault:")) {
                    const [, vaultPath, vaultKey] = value.split(":");
                    return [key, await readVaultData(vaultPath, vaultKey)];
                }
                return [key, await replaceVaultValues(value)];
            })
        );
        return Object.fromEntries(entries) as T;
    }

    return data;
}
