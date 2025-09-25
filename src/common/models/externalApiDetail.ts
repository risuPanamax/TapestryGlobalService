import sequelize from "../db/sequelize";
import { BaseModels } from "./baseModels";
const { DataTypes } = require("sequelize");

class ExternalApiDetail extends BaseModels.BaseModelStatusVisibilityValidToFrom {
    declare ExternalApiId: number;
    declare ApiEndPoint: string;
    declare Name: string;
    declare Description: string;
    declare ApiProvider: string;
    declare RequestType: number ; // 1: JSON, 2: XML, 3: FORM
    declare HTTPRequestType: number; // 1: GET, 2: POST, 3: PUT, 4: DELETE
    declare Request: any;
}

ExternalApiDetail.initModel(
    {
        ExternalApiId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ApiEndPoint: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        ApiProvider: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        RequestType: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true,
            comment: "1: JSON, 2: XML, 3: FORM",
        },
        HTTPRequestType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "1-GET, 2-POST, 3-PUT, 4-DELETE",
        },
        Request: {
            type: DataTypes.BLOB,
            allowNull: false,
            get() {
                const blob = this.getDataValue('Request');
                return blob ? JSON.parse(blob.toString('utf8')) : null;
            }
        },
    },
    {
        sequelize,
        modelName: "ExternalApiDetail",
        tableName: "TBLMExternalApiDetail",
        timestamps: false,
    }
);
export { ExternalApiDetail };

