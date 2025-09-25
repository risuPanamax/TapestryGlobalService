export const CommonConstants = {
    VALID_TO_DATE: "2035-12-31 23:59:59",
    DB_CACHING_KEYS: {
        SYSTEM_PARAMETER: "SystemParameter",
    },
    HTTP_REQUEST_TYPE: {
        GET: 1,
        POST: 2,
        PUT: 3,
        DELETE: 4,
    },
    EXTERNAL_API_REQUEST_TYPE: {
        JSON: 1,
        XML: 2,
        FORM: 3,
    },

    CONTENT_TYPE: {
        JSON: "application/json",
        FORM: "multipart/form-data",
    },
    // Add more keys here later
} as const;

export default CommonConstants;