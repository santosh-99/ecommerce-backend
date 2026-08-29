import userRepository from "../repository/user.repository.js";
import { UnauthorizedError } from "../errors/index.js";

const authMiddleware = async (req, res, next) => {

    try {

        // ==========================================================
        // CHECK SESSION
        // ==========================================================

        if (!req.session || !req.session.userId) {

            throw new UnauthorizedError(
                "Authentication required."
            );
        }


        // ==========================================================
        // FIND USER
        // ==========================================================

        const user = await userRepository.findById(
            req.session.userId
        );


        // ==========================================================
        // USER NOT FOUND
        // ==========================================================

        if (!user) {

            req.session.destroy(() => {});

            throw new UnauthorizedError(
                "Authentication required."
            );
        }


        // ==========================================================
        // ATTACH USER TO REQUEST
        // ==========================================================

        req.user = {

            userId: user._id.toString(),

            email: user.email,

            role: user.type

        };


        next();

    } catch (error) {

        if (error instanceof UnauthorizedError) {

            return next(error);
        }

        return next(
            new UnauthorizedError(
                "Authentication required."
            )
        );
    }
};

export default authMiddleware;