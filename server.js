import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import requestLogger from "./src/middleware/loggerMiddleware.js";


const initApp = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join("src","public")));
  app.use(requestLogger);
  

  return app;
};

export default initApp;
