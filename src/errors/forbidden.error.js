import ApplicationError from "./application.error.js";

class ForbiddenError extends ApplicationError {

    constructor(message = "Forbidden") {
        super(message, 403);

    }
}

export default ForbiddenError;