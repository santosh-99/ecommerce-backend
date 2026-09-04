import appConfig from "./src/config/app.config.js";
import sessionMiddleware from "./src/config/session.js";

import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import requestLogger from "./src/middlewares/logger.Middleware.js";

const createApp = () => {

    const app = express();

    app.use(cors(appConfig.corsOptions));

    app.use(express.json());

    app.use(
        express.urlencoded({
            extended: true
        })
    );

    app.use(cookieParser());
    app.set("trust proxy", 1);
    app.use(sessionMiddleware);

    app.use(requestLogger);

    // app.use(express.static("public"));
    app.use(
    "/uploads",
    express.static("public/uploads")
);

    return app;
};

export default createApp;