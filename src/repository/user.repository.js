import BaseRepository from "./base.repository.js";
import userModel from "./models/user.model.js";


class UserRepository extends BaseRepository {

    constructor() {

        super(userModel);

    }

    // ==============================================================
    // FIND USER BY EMAIL
    // ==============================================================


    async findByEmail(email) {

        return this.model.findOne({

            email: email.toLowerCase()

        });

    }

    // ==============================================================
    // FIND USER BY ID
    // ==============================================================


    async findById(userId) {

        return this.model.findById(userId);

    }

    // ==============================================================
    // FIND USER BY TYPE
    // ==============================================================

    async findByType(type) {
        return this.model.find({
            type: type
        });
    }

    // ==============================================================
    // UPDATE USER
    // ==============================================================


    async findByIdAndUpdate(userId, data) {

        return this.model.findByIdAndUpdate(

            userId,

            data,

            {
                new: true,
                runValidators: true
            }

        );

    }


    // ==============================================================
    // DELETE USER
    // ==============================================================


    async findByIdAndDelete(userId) {

        return this.model.findByIdAndDelete(
            userId
        );

    }

}


export default new UserRepository();