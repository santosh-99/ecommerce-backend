import ApplicationError from "./application.error.js";

class BadRequestError extends ApplicationError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export default BadRequestError;