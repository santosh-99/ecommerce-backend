import express from "express";
import controller from "../../controller/index.js";

const router = express.Router();
router.post('/register', controller.user.register);
router.post('/login', controller.user.login);
router.post('/logout', controller.user.logout);


export default router;


