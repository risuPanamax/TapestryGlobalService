// const MODULE = "DB_CACHE_MANAGER";
// import { ErrorConstants } from "../constant/errorConstant";
// import TapestryGlobalError from "../error/tapestryGlobalError";
// import { debugLoggerHelper, errorLoggerHelper } from "../loggers";


// // Prepare the cache with required data
// const prepareCache = async (): Promise<any[]> => {
//     return Promise.all([
//         getSystemParameterDataFromDB(),
//         // Add other data-fetching functions if needed
//     ]);
// };

// // Main function to prepare and read the cache
// export async function initializeCache(): Promise<void> {
//     try {
//         debugLoggerHelper(`Starting in memory cache preparation`, MODULE);
//         await prepareCache();
//         debugLoggerHelper(`In memory cache preparation completed for all cache manager`, MODULE);
//     } catch (error: any) {
//         errorLoggerHelper(
//             `There is error in cache manager while trying to set value to the cache. ${error?.message}`,
//             MODULE
//         );
//         throw new TapestryGlobalError(MODULE, error, 500, ErrorConstants.CACHE_MANAGER_ERROR);
//     }
// }

// export { prepareCache };
