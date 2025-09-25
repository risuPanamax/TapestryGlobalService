import fs from "fs";
import path from "path";

// avoid circular dependency by not importing logger here

let appConfig: Record<string, any> | null = null;
let logConfig: Record<string, any> | null = null;
let maskingConfig: Record<string, any> | null = null;
let dbConfig: Record<string, any> | null = null;

const loadConfigurations = async (): Promise<void> => {
  // application-config.json
  let configPath = path.join(process.cwd(), "repository", "config", "application-config.json");
  
  let configData = fs.readFileSync(configPath, "utf-8");
  appConfig = JSON.parse(configData);

  // log-config.json
  configPath = path.join(process.cwd(), "repository", "config", "log-config.json");
  configData = fs.readFileSync(configPath, "utf-8");
  logConfig = JSON.parse(configData);

  configPath = path.join(process.cwd(), "repository", "config", "sequelize-db-config.json");
  configData = fs.readFileSync(configPath, "utf-8");
  dbConfig = JSON.parse(configData);

  // masking-config.json
  configPath = path.join(process.cwd(), "repository", "config", "masking-config.json");
  configData = fs.readFileSync(configPath, "utf-8");
  maskingConfig = JSON.parse(configData);
};
loadConfigurations();

// Getters
export const getApplicationConfig = () => appConfig;
export const getLogConfig = () => logConfig;
export const getDatabaseConfig = () => dbConfig;
export const getMaskingConfig = () => maskingConfig;

// Setters
export const setApplicationConfig = (config: Record<string, any>) => (appConfig = config);
export const setLogConfig = (config: Record<string, any>) => (logConfig = config);
export const setDatabaseConfig = (config: Record<string, any>) => (dbConfig = config);

export const setMaskingConfig = (config: Record<string, any>) => (maskingConfig = config);
