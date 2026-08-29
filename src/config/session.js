import session from "express-session";
import MongoStore from "connect-mongo";

import appConfig from "./app.config.js";


// ============================================================
// SESSION MIDDLEWARE
// ============================================================

const sessionMiddleware = session({

    secret: appConfig.session.secret,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({

        mongoUrl: appConfig.mongoURI,

        collectionName: "sessions"
    }),


    cookie: {
        httpOnly: true,

        secure:
            process.env.NODE_ENV === "production",

        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",

        maxAge:
            appConfig.session.expiresIn
    }
});


export default sessionMiddleware;