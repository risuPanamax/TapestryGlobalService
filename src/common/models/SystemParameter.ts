import sequelize from "../db/sequelize";
import { DataTypes } from "sequelize";
import { BaseModels } from "./baseModels";

class SystemParameter extends BaseModels.BaseModelStatusVisibilityValidToFrom {}

SystemParameter.initModel(
  {
    SystemParameterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Alias: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Description: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    Value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ValueSourceType: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    ValueSource: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Validation: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    ValidationMessageML: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SystemParameter",
    tableName: "TBLMSystemParameter",
    timestamps: false,
  }
);

export { SystemParameter };
