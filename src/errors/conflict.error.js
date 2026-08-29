import ApplicationError from "./application.error.js";

class ConflictError extends ApplicationError {
    constructor(message = "Resource alreday exists") {
        super(message, 409);
    }
}

export default ConflictError;