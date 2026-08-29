import { ForbiddenError } from "../errors/index.js";

const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        // ==========================================================
        // AUTHENTICATION CHECK
        // ==========================================================

        if (!req.user) {

            return next(
                new ForbiddenError(
                    "User authentication required."
                )
            );
        }


        // ==========================================================
        // GET USER ROLE
        // ==========================================================

        const userRole =
            req.user.role?.toLowerCase();


        // ==========================================================
        // CHECK ROLE PERMISSION
        // ==========================================================

        const hasPermission =
            allowedRoles
                .map((role) => role.toLowerCase())
                .includes(userRole);


        // ==========================================================
        // ACCESS DENIED
        // ==========================================================

        if (!hasPermission) {

            return next(
                new ForbiddenError(
                    "You do not have permission to access this resource."
                )
            );
        }


        // ==========================================================
        // ACCESS GRANTED
        // ==========================================================

        next();
    };
};

export default authorizeRoles;