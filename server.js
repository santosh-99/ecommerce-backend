import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import requestLogger from "./src/middleware/loggerMiddleware.js";


const initApp = async () => {
  const app = express();
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL,"http://localhost:5173"],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(requestLogger);
  app.use("/uploads", express.static(path.join("src", "public", "uploads")));
  

  return app;
};

export default initApp;
