import { ApplicationError } from "../errors/index.js";

const errorHandler = (err, req, res, next) => {

    // ============================================================
    // EXISTING APPLICATION ERROR HANDLING
    // ============================================================

    if (err instanceof ApplicationError) {

        return res.status(
            err.statusCode || 500
        ).json({
            success: false,
            message: err.message
        });
    }


    // ============================================================
    // NEW: Handle unexpected / unknown errors
    // ============================================================

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};


export default errorHandler;