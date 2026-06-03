import service from "../../service/index.js";

export const newProduct = async (req, res, next) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body can not be empty",
    });
  }
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an image"});
  }
  try {
    const host = `${ req.protocol}://${req.get('host')}`;
    const productData = {
      ...body,
      image: `${host}/uploads/${req.file.filename}`,
    };
    const product = await service.product.addProduct(productData);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const fetchAll = async (req, res, next) => {
  try {
    const products = await service.product.getAll();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
export const fetchOne = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await service.product.getOne(productId);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const productUpdate = async (req, res, next) => {

  try {
    const { id }  = req.params;
    const updateData = req.body;

    const product = await service.product.updateProduct(id, updateData);

    res.status(200).json({
      success: true,
      message: "Product Updated successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const productDelete = async (req, res, next) => {
  try {
    const productId = req.params.productId;
     await service.product.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
export const productFilter = async (req, res, next) => {
  try {
    const products = await service.product.filterProduct(req.query);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
export const productRating = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { rating } = req.body;
    const userId = req.user.userId;

    if (!userId || !rating) {
      return res.status(400).json({
        success:false,
        message: "UserID and rating required",
      });
    }
    const updatedProduct = await service.product.rateProduct(
      userId,
      productId,
      rating,
    );
    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const bulkCreate = async (req, res, next) => {
  try {
    console.log("product controller");
    const products = JSON.parse(req.body.products);
    console.log("products:", products);

    const files = req.files;

    //map images to products;
    const finalProducts = products.map((product, index) => {
      return {
        ...product,
        image: files[index] ? `/uploads/${files[index].filename}` : null,
      };
    });
    const bulkProduct = await service.product.bulkCreateService(finalProducts);
    console.log("bulK:", bulkProduct);
    res.status(201).json({
      success: true,
      data: bulkProduct,
    });
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
};
