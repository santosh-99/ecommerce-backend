import userService from "../services/user.Service.js";


class UserController {

    constructor() {

        this.userService = userService;

    }


    // ==============================================================
    // GET ALL USERS
    // ==============================================================

    async getUsers(req, res, next) {

        try {

            const users =
                await this.userService.getUsers();


            return res.status(200).json({

                success: true,

                message: "Users fetched successfully.",

                data: users

            });

        } catch (error) {

            next(error);

        }

    }


    // ==============================================================
    // GET ALL SELLERS
    // ==============================================================
      async getSellers(req, res, next) {
        try {
            const sellers = await this.userService.getSellers();

            return res.status(200).json({
                success: true,
                message: "Sellers fetched successfully.",
                data: sellers
            });

        } catch (error) {
            next(error);
        }
      }


    // ==============================================================
    // GET USER BY ID
    // ==============================================================

    async getUserById(req, res, next) {

        try {

            const user =
                await this.userService.getUserById(
                    req.params.userId
                );


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found.",

                    data: null

                });

            }


            return res.status(200).json({

                success: true,

                message: "User fetched successfully.",

                data: user

            });

        } catch (error) {

            next(error);

        }

    }


    // ==============================================================
    // UPDATE USER
    // ==============================================================

    async updateUser(req, res, next) {

        try {

            const user =
                await this.userService.updateUser(
                    req.params.userId,
                    req.body
                );


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found.",

                    data: null

                });

            }


            return res.status(200).json({

                success: true,

                message: "User updated successfully.",

                data: user

            });

        } catch (error) {

            next(error);

        }

    }


    // ==============================================================
    // DELETE USER
    // ==============================================================

    async deleteUser(req, res, next) {

        try {

            const user =
                await this.userService.deleteUser(
                    req.params.userId
                );


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found.",

                    data: null

                });

            }


            return res.status(200).json({

                success: true,

                message: "User deleted successfully.",

                data: user

            });

        } catch (error) {

            next(error);

        }

    }

}


export default new UserController();