import { Product } from './product';
var db = new PouchDB('ivman');

export class AddProductSection {
  productName: string;
  productCount: number;

  addProduct() {
    let product = new Product(this.productName);
    product._id = new Date().toISOString();
    product.quantity = this.productCount;
    db.put(product)
      .then(doc => console.log(`Product ${product.name} has been added successfully`))
      .catch(error => console.log(error));
    this.productName = null;
    this.productCount = null;
  }
}