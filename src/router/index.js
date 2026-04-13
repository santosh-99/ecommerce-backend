import user from "./user/index.js";
import product from "./product/index.js";
import cart from "./cart/index.js";
import order from "./order/index.js";
import payment from "./payment/index.js";
import dashboard from "./dashboard/index.js";

const initRoutes = async (app) => {
  app.use("/api/v1/users", user);
  app.use("/api/v1/products", product);
  app.use("/api/v1/carts", cart);
  app.use("/api/v1/orders", order);
  app.use("/api/v1/payments", payment);
  app.use("/api/v1/dashboard", dashboard);
};
export default initRoutes;
