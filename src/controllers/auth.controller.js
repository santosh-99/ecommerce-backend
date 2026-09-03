import authService from "../services/auth.service.js";


class AuthController {

    constructor() {

        this.authService = authService;

    }


    // ============================================================
    // REGISTER
    // ============================================================

    register = async (req, res) => {

        try {

            const result =
                await this.authService.register(req.body);

             return res.status(201).json({

                success: true,

                message: "User registered successfully.",

                data: result

            });

        } catch (error) {

            next(error)

        }

    };


    // ============================================================
    // LOGIN
    // ============================================================

    login = async (req, res) => {

        try {

            const authResult = await this.authService.login(req.body);

            //create sesssion

            req.session.userId = authResult.user.id.toString()

            //explicitly save session
            req.session.save((error) => {

                if (error) {
                    return next(error);
                }

                return res.status(200).json({
                    success: true,
                    message: "Login successful.",
                    data: {
                        user: authResult.user
                    }
                });
            });



        } catch (error) {
            next(error);
        }

    };


    // ============================================================
    // LOGOUT
    // ============================================================

    logout = async (req, res, next) => {

        try {

            // No active session

            if (!req.session) {

                return res.status(200).json({

                    success: true,

                    message: "Logout successful."

                });

            }


            // Destroy server-side session

            req.session.destroy((error) => {

                if (error) {

                    return next(error);

                }


                // Clear session cookie

                res.clearCookie("connect.sid");


                return res.status(200).json({

                    success: true,

                    message: "Logout successful."

                });

            });

        } catch (error) {

            next(error);

        }

    };


    // ============================================================
    // CURRENT AUTHENTICATED USER
    // ============================================================

    me = async (req, res) => {

        return res.status(200).json({

            success: true,

            message: "Authenticated user.",

            data: req.user

        });

    };

}


export default new AuthController();