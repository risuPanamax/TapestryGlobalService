import { Model, DataTypes, ModelAttributes, InitOptions } from "sequelize";
import sequelize from "../db/sequelize";
import CommonConstants from "../constant/commonConstant";

// Common field groups
const requestIdFields: ModelAttributes = {
    RequestId: {
        type: DataTypes.VIRTUAL,
    },
};

// Status + Visibility fields
const statusVisibilityFields: ModelAttributes = {
    Status: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "0: Active, 1: Inactive, 2: Deleted",
    },
    Visibility: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        comment: "1: Visible, 0: Hidden",
    },
};
// Valid From/To fields
const validFromToDateFields: ModelAttributes = {
    ValidFromDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    ValidToDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: CommonConstants.VALID_TO_DATE,
    },
};
// CreatedBy + UpdatedBy fields
const createdUpdatedByFields: ModelAttributes = {
    CreatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    UpdatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
};
// CreatedDate + LastUpdatedDate fields
const createUpdateAtFields: ModelAttributes = {
    CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    LastUpdatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
};

// Base Model with Status + Visibility +Valid To/From
class BaseModelStatusVisibilityValidToFrom extends Model {
    public Status!: number;
    public Visibility!: number;
    public ValidFromDate!: Date;
    public ValidToDate!: Date;

    static initModel(attributes: ModelAttributes, options: InitOptions): void {
        const mergedAttributes = {
            ...attributes,
            ...statusVisibilityFields,
            ...validFromToDateFields,
            ...requestIdFields,
        };
        super.init(mergedAttributes, { ...options, sequelize });
    }
}
// Base Model with Status + Visibility 
class BaseModelStatusVisibility extends Model {
    public Status!: number;
    public Visibility!: number;
    public ValidFromDate!: Date;
    public ValidToDate!: Date;

    static initModel(attributes: ModelAttributes, options: InitOptions): void {
        const mergedAttributes = {
            ...attributes,
            ...statusVisibilityFields,
            ...requestIdFields,
        };
        super.init(mergedAttributes, { ...options, sequelize });
    }
}
// Base Model with All of above 
class BaseCommonAll extends Model {
    public Status!: number;
    public Visibility!: number;
    public ValidFromDate!: Date;
    public ValidToDate!: Date;

    static initModel(attributes: ModelAttributes, options: InitOptions): void {
        const mergedAttributes = {
            ...attributes,
            ...validFromToDateFields,
            ...createdUpdatedByFields,
            ...createUpdateAtFields,
            ...statusVisibilityFields,
            ...requestIdFields,
        };
        super.init(mergedAttributes, { ...options, sequelize });
    }
}

export const BaseModels = {
    BaseCommonAll,
    BaseModelStatusVisibility,
    BaseModelStatusVisibilityValidToFrom
};
