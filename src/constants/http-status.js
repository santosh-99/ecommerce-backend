const HTTP_STATUS = {

    //2XX - Success
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    //4xx - Clinet Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT:409,

    // 5xx - Server Errors
    INTERNAL_SERVER_ERROR: 500
};

export default HTTP_STATUS;