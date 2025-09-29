import swaggerAutogen from "swagger-autogen";
import { getApplicationConfig } from "../middlewares/loadConfiguration";

const appConfig = getApplicationConfig();

const outputFile = "../../swagger_output.json";
const endpointsFiles = ["./src/magic-builder/routes/index.ts"];
const NODE_ENV = appConfig?.environment;

const doc = {
    info: {
        title: "Tapestry Global Service Rest API",
        description: "Tapestry Global Service Rest API",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:5557",
            description: "Local server",
        },
    ],
    components: {
        schemas: {} as Record<string, unknown>, // Define reusable schemas (optional)
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

if (NODE_ENV === "DEV" && process.env.NODE_ENV !== "test") {
    swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
        require("../../../index.ts"); // Entry point
    });
}

export default doc;
