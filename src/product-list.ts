import { Product } from './product';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ProductCreated, ProductDeleted } from './messages';

var db = new PouchDB('ivman');

@inject(EventAggregator)
export class ProductList {
  products: Product[] = [];

  constructor(private ea: EventAggregator) {
    ea.subscribe(ProductCreated, message => {
      this.products.unshift(message.product);
    });
    ea.subscribe(ProductDeleted, message => {
      let deletedProductIndex = this.products.findIndex(product => product._id == message.product._id);
      this.products.splice(deletedProductIndex, 1);
    });
  }

  removeItem(product) {
    db.get(product._id).then(productDoc => {
      return db.remove(productDoc);
    }).then(doc => {
      this.ea.publish(new ProductDeleted(product));
      console.log(`Product '${product.name}' has been deleted successfully.`);
    }).catch(error => {
      console.log(error);
    })
  }

  attached() {
    console.log("Getting products..");
    db.allDocs({ include_docs: true, descending: true }).then(doc => {
      this.products = doc.rows.map(product => product.doc)
    })
  }
}