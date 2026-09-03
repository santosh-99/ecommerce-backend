import userRepository from "../repository/user.repository.js";
import { UnauthorizedError } from "../errors/index.js";

const authMiddleware = async (req, res, next) => {

    try {

        // ==========================================================
        // CHECK SESSION
        // ==========================================================

        if (!req.session?.userId) {


            return next(
                 new UnauthorizedError(
                "Authentication required."
            )
        );

        }


        // ==========================================================
        // FIND USER
        // ==========================================================

        const user = await userRepository.findById(
            req.session.userId
        );


        // ==========================================================
        // USER NOT FOUND / INVALID SESSION
        // ==========================================================

        if (!user) {

            return req.session.destroy(() => {

                next(
                    new UnauthorizedError(
                        "Authentication required."
                    )
                );
            });


        }

        // ==========================================================
        // ATTACH USER TO REQUEST
        // ==========================================================

        req.user = {

            userId: user._id.toString(),

            email: user.email,

            role: user.type

        };

        // ==========================================================
        // SUCCESSFUL AUTHENTICATION
        // ==========================================================

        next();

    } catch (error) {
        
        next(error);

    }
};

export default authMiddleware;