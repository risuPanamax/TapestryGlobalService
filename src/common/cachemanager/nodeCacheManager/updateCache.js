// const { cache } = require('./initializeCache');

// // Utility to validate cache keys
// const isValidKey = (key) => {
//     if (!key || typeof key !== 'string') {
//         throw new Error('Cache key must be a non-empty string');
//     }
// };

// // API to manually clear a specific cache entry
// const deleteCache = (key) => {
//     isValidKey(key);
//     cache.del(key);
//     return {
//         status: 200,
//         message: `Cache cleared for key: ${key}`,
//     };
// };

// // API to clear all cache entries
// const deleteAllCache = () => {
//     cache.flushAll();
//     return {
//         status: 200,
//         message: 'All cache cleared',
//     };
// };

// module.exports = {
//     deleteCache,
//     deleteAllCache,
// };
