import { Product } from './product';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ProductCreated } from './messages';
import {inject} from 'aurelia-framework';

var db = new PouchDB('ivman');

@inject(EventAggregator)
export class AddProductSection {
  productName: string;
  productCount: number;

  constructor(private ea: EventAggregator) { }

  addProduct() {
    let product = new Product(this.productName);
    product._id = new Date().toISOString();
    product.quantity = this.productCount;
    db.put(product)
      .then(doc => console.log(`Product ${product.name} has been added successfully`))
      .catch(error => console.log(error));
    this.ea.publish(new ProductCreated(product));
    this.productName = null;
    this.productCount = null;
  }
}