import express from "express";
import jwtMiddleware from "../../middleware/jwtAuthMiddleware.js";
const router = express.Router();

router.get("/", jwtMiddleware, (req, res) => {
  res.redirect("/users/dashboard");
});

export default router;
