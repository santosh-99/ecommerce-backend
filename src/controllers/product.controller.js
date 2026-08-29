import productService from "../services/product.service.js";

class ProductController {
  constructor(){
    this.productService = productService;
  }

  async createProduct(req, res, next) {

    try {
      const productData = {
        ...req.body,
        image: req.file ?`/uploads/products/${req.file.filename}`: null,
      };
      const product = await productService.createProduct(productData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await productService.getProducts();

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(
        req.params.productId
      );

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.productId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await productService.deleteProduct(
        req.params.productId
      );

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }


  //7.Filter product
  async filterProduct(req, res, next) {
    try {
      const products = productService.filterProducts(req.query);

      res.status(200).json({
        success:true,
        message:"Filtered products successfully",
        data: products
      });

    }catch(error){
      next(error);
    }


  }




  //8.Rate product
}

export default new ProductController();