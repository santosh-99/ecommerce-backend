import express from "express";
import controller from "../../controller/index.js";
import uploadFile from "../../middleware/multer.middleware.js";
import jwtAuthMiddleware from "../../middleware/jwtAuthMiddleware.js";
import productRules from "../../utils/validators/productValidator.js";
import validateRequest from "../../middleware/handleValidation.js";

const router = express.Router();
router.use(jwtAuthMiddleware);

router.post("/", uploadFile.single("image"), productRules, validateRequest, controller.product.newProduct);
router.get("/",controller.product.fetchAll);
router.get("/filter", controller.product.productFilter);
router.get("/:productId", controller.product.fetchOne);
router.put("/:id", controller.product.productUpdate);
router.delete("/:productId", controller.product.productDelete);
router.post("/:productId/rate", controller.product.productRating);
router.post("/bulk", uploadFile.array('image', 10), controller.product.bulkCreate)

export default router;
