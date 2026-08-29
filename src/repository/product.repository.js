import BaseRepository from "./base.repository.js";
import productModel from "./models/product.model.js"

class ProductRepository extends BaseRepository {

  constructor(){
    super(productModel);

  }
  async updateProduct(productId, data){
    return this.findByIdAndUpdate(productId, data)
  }
  async deleteProduct(productId) {
    return this.findByIdAndDelete(productId);
  }
  async filterProducts(filter) {
    return this.findAll(filter);
  }


}

export default new ProductRepository();