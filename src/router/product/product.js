import express from "express";
import controller from "../../controller/index.js";
import uploadFile from "../../middleware/multer.middleware.js";
import jwtAuthMiddleware from "../../middleware/jwtAuthMiddleware.js";

const router = express.Router();

router.use(jwtAuthMiddleware);
router.post("/",uploadFile.single("image"), controller.product.newProduct);
router.get("/",controller.product.fetchAll);
router.get("/filter", controller.product.productFilter);
router.get("/:productId", controller.product.fetchOne);
router.put("/:productId", controller.product.productUpdate);
router.delete("/:productId", controller.product.productDelete);
router.post("/:productId/rate", controller.product.productRating);
router.post("/bulk", uploadFile.array('image', 10), controller.product.bulkCreate)

export default router;
