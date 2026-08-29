import userRepository from "../repository/user.repository.js";


class UserService {

    constructor() {

        this.userRepository =
            userRepository;

    }


    // =========================
    // GET ALL USERS
    // =========================

    async getUsers() {

        return this.userRepository.findAll();

    }


    // =========================
    // GET ALL SELLERS
    // =========================
    async getSellers() {
        return this.userRepository.findByType("seller");
    };




    // =========================
    // GET USER BY ID
    // =========================

    async getUserById(userId) {

        return this.userRepository.findById(
            userId
        );

    }


    // =========================
    // UPDATE USER
    // =========================

    async updateUser(userId, data) {

        return this.userRepository.findByIdAndUpdate(
            userId,
            data
        );

    }


    // =========================
    // DELETE USER
    // =========================

    async deleteUser(userId) {

        return this.userRepository.findByIdAndDelete(
            userId
        );

    }

}


export default new UserService();