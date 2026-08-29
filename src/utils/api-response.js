import HTTP_STATUS from "../constants/http-status.js";


export const sendSuccess = (
    res,
    {
        statusCode = HTTP_STATUS.OK,
        message = "",
        data = null
    } = {}
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};


export const sendError = (
    res,
    {
        statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message = "Internal Server Error",
        errors = null
    } = {}
) => {

    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};


/**
 * return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: "User registered successfully.",
    data: result
});
 */