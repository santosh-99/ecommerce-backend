import mongoose from "mongoose";
import appConfig from "./app.config.js";

const connectDatabase = async () => {
    const connection = await mongoose.connect(appConfig.mongoURI);
    console.log("Connected to mongodb database");

    return connection;
}

export default connectDatabase;