const MODULE = "DB_CONFIG";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { getDatabaseConfig } from "../middlewares/loadConfiguration";
import { debugLogger, errorLogger, traceLogger } from "../loggers";

const dbconfig = getDatabaseConfig();
console.log(MODULE, "dbconfig", dbconfig);

if (!dbconfig) {
    throw new Error("DB configuration could not be loaded.");
}
// remove this line once volt integration is done
dbconfig.database = "TapestryGlobalService"
// remove this line once volt integration is done
const sequelize = new Sequelize(
    dbconfig.database as string,
    dbconfig.username as string,
    dbconfig.password as string,
    {
        host: dbconfig.dbHost,
        port: dbconfig.dbPort,
        dialect: dbconfig.dialect as any,
        dialectOptions: {
            multipleStatements: false,
        },
        dialectModule: mysql2,
        pool: {
            max: dbconfig.max,
            min: dbconfig.min,
            acquire: dbconfig.acquire,
            idle: dbconfig.idle,
        },

        logging: (msg: string) => debugLogger(msg),
    }
);
sequelize
    .authenticate()
    .then(() => {
        debugLogger(
            `Connection has been established successfully to ${dbconfig.database}.`,
            MODULE
        );
    })
    .catch((err: any) => {
        console.log("err--------------err");

        errorLogger(
            `Unable to connect to the database`, err,
            MODULE
        );
        traceLogger(err.stack, MODULE);
    });

export default sequelize;
