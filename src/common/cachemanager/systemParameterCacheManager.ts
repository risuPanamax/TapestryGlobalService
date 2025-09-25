// import TapestryGlobalError from "../error/tapestryGlobalError";
// import { ErrorConstants } from "../constant/errorConstant";
// import CommonConstants from "../constant/commonConstant";
// import { debugLogger, errorLogger } from "../loggers";

// const MODULE = "SYSTEM_PARAM_CACHE_MANAGER";

// export const getSystemParameterDataFromDB = async (): Promise<boolean> => {
//     debugLogger(`Prepare Cache for SystemParameter`, MODULE);

//     try {
//         const systemData = await systemParameterRepo.getAllSystemParam();

//         if (systemData && Array.isArray(systemData)) {
//             loopOverArray(systemData, "Alias", "Value");

//             // Debug/test only: Verify critical keys
//             // const criticalKeys = ["FILEUPLOADDIR", "FILE_UPLOAD_EXTENSIONS"];
//             // verifyCriticalKeys("SystemParameter", criticalKeys);

//             debugLogger(`Cache preparation completed for SystemParameter`, MODULE);
//             return true;
//         } else {
//             errorLogger(`Problem occurred while preparing cache for SystemParameter`, MODULE);
//             throw new TapestryGlobalError(MODULE, null, 500, ErrorConstants.SYSTEM_PARAMETER_NOT_FOUND);
//         }
//     } catch (error: any) {
//         errorLogger(
//             `Problem occurred while preparing cache for SystemParameter, ${error?.message}`,
//             MODULE
//         );
//         throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.CACHE_MANAGER_ERROR);
//     }
// };

// // Loop through an array and add each item to the cache
// const loopOverArray = (systemData: any[], key: string, valueKey: string): void => {
//     const tempObj: Record<string, any> = {};
//     systemData.forEach((el) => {
//         tempObj[el[key]] = el[valueKey];
//     });

//     setValueInCache(CommonConstants.DB_CACHING_KEYS.SYSTEM_PARAMETER, tempObj);
// };
