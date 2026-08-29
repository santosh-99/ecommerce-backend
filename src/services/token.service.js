import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";

class TokenService {

    generateAccessToken(payload) {

        return jwt.sign(
            payload,
            appConfig.jwt.accessTokenSecret,
            {
                expiresIn: appConfig.jwt.accessTokenExpiresIn
            }
        );
    }

    generateRefreshToken(payload) {
        return jwt.sign(
            payload,
            appConfig.jwt.refreshTokenSecret,
            {
                expiresIn: appConfig.jwt.refreshTokenExpiresIn
            }
        );
    }

    verifyAccessToken(token) {
        return jwt.verify(
            token,
            appConfig.jwt.accessTokenSecret
        );
    }
    verifyRefreshToken(token) {
        return jwt.verify(
            token,
            appConfig.jwt.refreshTokenSecret
        );
    }

}

export default new TokenService();

