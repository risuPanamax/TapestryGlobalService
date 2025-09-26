const MODULE = "TAPESTRY_APP_INIT";
import express, { Application } from "express";
const swaggerUi = require('swagger-ui-express');

// middlewares
import { ErrorHandler, } from "./src/common/middlewares/errorHandlerMiddleware";
import { getApplicationConfig } from "./src/common/middlewares/loadConfiguration";

// helpers
import { warnLogger, debugLogger } from "./src/common/loggers";

// utils
require('./src/common/utils/swagger');

const startApplication = async () => {
  // load config
  const appConfig = getApplicationConfig();
  // middlewares
  const expressLogger = require("./src/common/middlewares/expressLogger");
  const requestIdMiddleware = require("./src/common/middlewares/requestIdGenerator");
  const responseMiddleware = require("./src/common/middlewares/responseMiddleware");
  const requestContextMiddleware = require("./src/common/middlewares/requestContextMiddleware");
  const { initializeVaultClient } = require("./src/common/vault/vaultIntegration");
  const { replaceValueFromVault } = require("./src/common/vault/vaultCallHelper");
  if (!appConfig) {
    throw new Error("Application configuration could not be loaded.");
  }
  const { port, allowedOrigins, environment: NODE_ENV } = appConfig;

  const app: Application = express();

  debugLogger("Starting application.... ", MODULE)

  await initializeVaultClient();
  await replaceValueFromVault();

  // routes
  const { magicBuilderApiRouter } = require("./src/magic-builder/routes");
  const { commonApiRouter } = require("./src/common/routes");

  warnLogger("Configuration loaded successfully!!", MODULE)

  // Security headers
  app.use((req, res, next) => {
    res.set("X-Frame-Options", "SAMEORIGIN");
    res.set("Content-Security-Policy", "frame-ancestors 'none'");
    res.set("X-Content-Type-Options", "nosniff");
    next();
  });

  app.disable("x-powered-by");
  //   app.use(hpp());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestIdMiddleware);
  app.use(requestContextMiddleware);
  app.use(expressLogger);
  app.use(responseMiddleware);
  if (NODE_ENV === "DEV" && process.env.NODE_ENV !== "test") {
    const swaggerFile = require("../TapestryGlobalService/swagger_output.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));
  }
  
  app.use("/common", commonApiRouter);
  app.use("/magic-builder", magicBuilderApiRouter);
  app.use(ErrorHandler);

  const server = app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`🚀 Server running at: \x1b[36m${url}\x1b[0m`);
  });
  return server;
}
// IIFE
// (async () => {
//   await startApplication();
// })();
startApplication();
