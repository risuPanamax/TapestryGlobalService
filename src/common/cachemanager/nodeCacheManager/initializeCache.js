// const NodeCache = require('node-cache');

// // Initialize the cache
// const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

// const initializeApplicationConfigCache = async (appConfig) => {
//     try {
//         Object.entries(appConfig).forEach(([key, value]) => {
//             cache.set(key, value);
//         });
//         //console.log('AppConfig values initialized in cache.');
//     } catch (error) {
//         console.error("Error initializing AppConfig cache:", error);
//     }
// };

// const initializeCache =  (appConfig) => {
//      initializeApplicationConfigCache(appConfig);
// };

// module.exports = {
//     cache,
//     initializeCache,
//     initializeApplicationConfigCache
// };
