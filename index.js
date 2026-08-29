import "./env.js";

import connectDatabase from "./src/config/initDB.js";
import createApp from "./app.js";
import router from "./src/routes/index.js";
import globalErrorHandler from "./src/middlewares/global.err.Middleware.js";

const PORT = process.env.PORT || 4000;

const initApp = async () => {

    const app = createApp();

    await connectDatabase();

    router(app);

    app.use(globalErrorHandler);

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

initApp().catch((err) => {

    console.error("Failed to start server:", err);

    process.exit(1);
});