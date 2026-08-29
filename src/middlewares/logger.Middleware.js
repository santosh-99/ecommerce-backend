import logger from "../utils/winston.Logger.js";

const requestLogger = (req, res, next) => {

    res.on("finish", () => {

        try {

            const safeBody = { ...req.body };

            const sensitiveFields = [
                "password",
                "token",
                "accessToken",
                "refreshToken"
            ];

            sensitiveFields.forEach((field) => {

                if (safeBody[field]) {
                    safeBody[field] = "******";
                }

            });


            logger.info({
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                body: safeBody
            });


        } catch (err) {

            console.error(
                "Logger internal error:",
                err
            );
        }

    });


    next();
};


export default requestLogger;