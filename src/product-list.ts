import { Product } from './product';
var db = new PouchDB('ivman');

export class ProductList {
    products: Product[] = [];

    removeItem(productId) {
        db.get(productId).then(product => {
            return db.remove(product);
        });
    }

    attached() {
        console.log("Getting products..");
        db.allDocs({ include_docs: true }).then(doc => {
            this.products = doc.rows.map(product => product.doc)
        })
    }
}