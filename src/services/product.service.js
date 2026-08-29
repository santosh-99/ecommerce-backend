import productRepository from "../repository/product.repository.js";
import {ApplicationError} from "../errors/index.js";

class ProductService {
  constructor(){
    this.productRepository = productRepository
  }

  //-----------------------------------------------------------------
  //create product
  //------------------------------------------------------------------
  async createProduct(productData){

   return await this.productRepository.create(productData);

  }

  async getProducts() {
    const products =  await this.productRepository.findAll();

    return products;
  }

  async getProductById(productId) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ApplicationError(
        "Product not found",
        404
      );
    }

    return product;
  }

  async updateProduct(productId, data) {
    const product = await this.productRepository.updateProduct(
      productId,
      data
    );

    if (!product) {
      throw new ApplicationError(
        "Product not found",
        404
      );
    }

    return product;
  }

  async deleteProduct(productId) {
    const product = await this.productRepository.deleteProduct(
      productId
    );

    if (!product) {
      throw new ApplicationError(
        "Product not found",
        404
      );
    }

    return product;
  }

  async filterProducts({category, size, minPrice, maxPrice }){
    const filter = {};
    if(category) {
      filter.category = category;
    }

    if(size) {
      filter.size = size;
    }

    if(minPrice  || maxPrice) {
      filter.price = {};

      if(minPrice) {
        filter.price.$gte = Number(minPrice);

      }
      if(maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }

    }
   const products = await this.productRepository.filterProducts(filter)

   return products;
  }

}

export default new ProductService();