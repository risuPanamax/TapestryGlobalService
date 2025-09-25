// const { cache } = require('./initializeCache');

// // Utility to validate cache keys
// const isValidKey = (key) => {
//     if (!key || typeof key !== 'string') {
//         throw new Error('Cache key must be a non-empty string');
//     }
// };

// const getCachedDataByKey = (key) => {
//     isValidKey(key);
//     const cachedData = cache.get(key);
//     if (cachedData) {
//         return cachedData;
//     }
//     return null; // Return null if cache miss
// };

// module.exports = {
//     getCachedDataByKey,
// };
