import bcrypt from "bcrypt";
import appConfig from "../config/app.config.js";

class PasswordService {

    async hash(password) {
        return bcrypt.hash(
            password,
            appConfig.bcrypt.saltRounds

        );

    }

    async compare(password, hashedPassword) {
        return bcrypt.compare(
            password,
            hashedPassword
        );

        //generateRandomPassword()
        //ValidateStregth()
        //generateResetToken()

    }

}

export default new PasswordService();