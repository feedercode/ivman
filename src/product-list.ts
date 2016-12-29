var db = new PouchDB('ivman');

export class ProductList {
    products = [];
    isReady = false;

    activate() {
        console.log("Inside the activate");
        db.allDocs({ include_docs: true }).then(doc => {
            console.log(doc.rows)
            this.products = doc.rows.map(product => {
                return { name: product.doc.name, quantity: product.doc.quantity };
            })
            this.isReady = true;
        })
    }
}