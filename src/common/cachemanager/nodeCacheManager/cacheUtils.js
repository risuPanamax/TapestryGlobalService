// const { getApplicationConfig } = require("../../middleware/loadConfiguration");


// const { getCachedDataByKey } = require("./getCache");
// const { initializeCache } = require("./initializeCache");


// const initAppCache = async () => {
//     try {
//         const appConfig = getApplicationConfig();

//         // Step 1: Initialize cache
//          initializeCache(appConfig);

//         // Step 2: Validate critical cache keys
//         const requiredKeys = ['environment', 'allowedOrigins', 'publicEndpoints', 'port'];
//         requiredKeys.forEach(key => {
//             if (!getCachedDataByKey(key)) {
//                 throw new Error(`Critical cache key missing: ${key}`);
//             }
//         });

//         console.info('Cache initialized successfully.');
//     } catch (error) {
//         console.error('Error during cache initialization:', error.message);
//         throw error;
//     }
// };
// initAppCache()
// module.exports = { initAppCache };
