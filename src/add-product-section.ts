import { Product } from './product';

export class AddProductSection {
  productName: string;
  productCount: number;

  addProduct() {
    console.log("I am inside")
    console.log(`name: ${this.productName}`);
    console.log(`count: ${this.productCount}`);
    this.productName = null;
    this.productCount = null;
  }
}