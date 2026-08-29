import swagger from "swagger-ui-express";
import apiDocs from "../../swagger.json" with { type: "json" };

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import orderRoutes from "./order.routes.js";
import paymentRoutes from "./payment.routes.js";

const initRoutes = (app) => {

    app.use(
        "/api-docs",
        swagger.serve,
        swagger.setup(apiDocs)
    );

    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/products", productRoutes);
    app.use("/api/v1/carts", cartRoutes);
    app.use("/api/v1/orders", orderRoutes);
    app.use("/api/v1/payments", paymentRoutes);
};

export default initRoutes;