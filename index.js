import "./env.js"
import initDb from "./src/repository/init.js";
import server from "./server.js";
import router from "./src/router/index.js";
import errorHandler from "./src/middleware/applicationError.middleware.js";
const PORT = process.env.PORT || 4000;

const initApp = async () => {
    const app = await server();
    await initDb();
    await router(app);
    app.use(errorHandler);

    app.listen(PORT, "0.0.0.0",() => {
      console.log(`server is listening on port ${PORT}`);
    });

}

initApp().catch((err) => {

    console.error(err);
    process.exit(0);
});