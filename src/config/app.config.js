const appConfig = {

    port: process.env.PORT,

    mongoURI: process.env.MONGO_URI,


    // ============================================================
    // JWT CONFIGURATION
    // ============================================================

    jwt: {

        accessTokenSecret:
            process.env.JWT_ACCESS_TOKEN_SECRET,

        accessTokenExpiresIn:
            process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,

        refreshTokenSecret:
            process.env.JWT_REFRESH_TOKEN_SECRET,

        refreshTokenExpiresIn:
            process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    },


    // ============================================================
    // NEW SESSION CONFIGURATION
    // ============================================================

    session: {

        secret:
            process.env.SESSION_SECRET,

        expiresIn:
            Number(
                process.env.SESSION_EXPIRES_IN
            )
    },


    // ============================================================
    // BCRYPT
    // Existing
    // ============================================================

    bcrypt: {

        saltRounds:
            Number(process.env.BCRYPT_SALT_ROUNDS)
    },


    // ============================================================
    // CORS
    // Existing
    // ============================================================

    corsOptions: {

        origin: [
            process.env.FRONTEND_URL,
            process.env.FRONTEND_PRODUCTION_URL
        ],

        credentials: true
    },

    // ============================================================
    // RAZORPAY
    // ============================================================

    razorpay: {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    }

};


export default appConfig;