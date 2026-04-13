import logger from "../utils/winstonLogger.js";

const requestLogger = (req, res, next) => {
  try {
    res.on("finish", () => {
      let safeBody = { ...req.body };

      if (safeBody.password) {
        safeBody.password = "******";
      }
      
      logger.info({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        body: safeBody,
      });
    });
    next();
  } catch (err) {
    console.log("logger Internal error:", err);
    next();
  }
};
export default requestLogger;
