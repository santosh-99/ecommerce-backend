import ApplicationError from "./application.error.js";

class UnauthorizedError extends ApplicationError {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}

export default UnauthorizedError;