import express from "express";
import controller from "../../controller/index.js";
import { registerRules, loginRules } from "../../utils/validators/userValidator.js";
import validateUserRequest from "../../middleware/handleValidation.js";

const router = express.Router();

router.post('/register',registerRules, validateUserRequest, controller.user.register);
router.post('/login',loginRules, validateUserRequest, controller.user.login);
router.post('/logout', controller.user.logout);


export default router;


