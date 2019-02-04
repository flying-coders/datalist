import { 
    AngularFirestore, 
    AngularFirestoreCollection, 
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemsDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));
    // this.items = this.afs.collection('items').valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    );
  }

  getItems() {
    return this.items;
  }

  addItem(item:Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemsDoc = this.afs.doc(`items/${item.id}`);
    this.itemsDoc.delete();
  }
}
