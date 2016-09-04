import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
    aurelia.use.basicConfiguration();
    aurelia.start().then(() => aurelia.setRoot('src/iv-man'));
}

var db = new PouchDB('ivman');
db.info().then(function (info) {
    console.log(info);
});

var remoteCouch = 'http://localhost:5984/ivman';
function sync() {
    var opts = { live: true };
    db.replicate.to(remoteCouch, opts);
    db.replicate.from(remoteCouch, opts);
}
if (remoteCouch) {
    sync();
}