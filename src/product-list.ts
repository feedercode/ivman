import { Product } from './product';
var db = new PouchDB('ivman');

export class ProductList {
    products: Product[] = [];

    removeItem(product) {
        db.get(product._id).then(productDoc => {
            return db.remove(productDoc);
        }).then(doc => {
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