import { ApplicationError } from "../utils/applicationError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  res.status(500).send("Something went wrong, please try later");
};
export default errorHandler;
