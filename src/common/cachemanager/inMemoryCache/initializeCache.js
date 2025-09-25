// const NodeCache = require('node-cache');

// // Initialize the cache with default settings
// // `stdTTL` (standard time to live): 0 means no expiration
// // `checkperiod`: 0 means no automatic cleanup checks
// const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
// const MobifinTapestryError = require("../../error/MobifinTapestryError");
// const logger = require("../../utils/logger");
// const ModuleNames = require("../../constant/moduleNames");
// const errorConstant = require("../../constant/errorConstant");

// const MODULE = ModuleNames.cacheManager.INITIALIZE_CACHE;

// /**
//  * Set a value in the cache with a specified key.
//  * If the key already exists, its value will be updated.
//  *
//  * @param {string} key - The key for storing the value in the cache.
//  * @param {any} value - The value to store in the cache.
//  */
// const setValueInCache = (key, value) => {
//     cache.set(key, value);
// };

// /**
//  * Retrieve data from the cache by a parent key, optionally accessing a nested key.
//  *
//  * @param {string} parentKey - The key for the main cached object.
//  * @param {string} [childKey] - (Optional) The key for accessing a nested value within the cached object.
//  * @returns {any|null} - The cached value if it exists, or `null` if the key is not found.
//  * @throws {Error} - If the `parentKey` is invalid or not a string.
//  */
// const retrieveCache = (parentKey, childKey) => {
//     if (!parentKey || typeof parentKey !== "string") {
//         throw new Error("Parent cache key must be a valid non-empty string");
//     }

//     const cachedData = cache.get(parentKey);
//     if (cachedData) {
//         return childKey ? cachedData[childKey] : cachedData;
//     }else{
//         logger.error(
//           `No cache data found for the parentKey -> ,${parentKey}`,
//           { module: MODULE, reqId: MODULE }
//         );
//         throw new MobifinTapestryError(
//           MODULE,
//           error,
//           null,
//           errorConstant.NO_CACHED_DATA_FOUND,
//           parentKey
//         );
//     }
//     return null;
// };

// /**
//  * Verify that critical keys exist in the cache under a specified parent key.
//  * Logs the value of each key if found, or throws an error if a key is missing.
//  *
//  * @param {string} parentKey - The key for the main cached object.
//  * @param {string[]} keys - An array of keys to check within the parent cache object.
//  * @throws {Error} - If any key in the array is missing from the cache.
//  */
// const verifyCriticalKeys = (parentKey, keys) => {
//     keys.forEach((key) => {
//         const cacheData = retrieveCache(parentKey, key);
//         if (!cacheData) {
//             throw new Error(`Critical cache key missing: ${key}`);
//         }
//         console.log(`Cache data for key '${key}':`, cacheData);
//     });
// };

// // Export the cache instance and utility functions for external use
// module.exports = {
//     cache,
//     setValueInCache,
//     retrieveCache,
//     verifyCriticalKeys,
// };
