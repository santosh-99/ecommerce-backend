import { ApplicationError } from "../utils/applicationError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message:"Something went wrong, please try later"
  });
};
export default errorHandler;
