import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class FirestoreProvider {

  itemsCol: AngularFirestoreCollection<any>;

  constructor(public afs: AngularFirestore) {
    this.itemsCol = this.afs.collection('notes');
  }

  get read() {
   return this.itemsCol;
  }

  save(datas) {
    return new Promise(res=>{
      console.log(datas);
      if (datas.id) {
        console.log(datas);
        this.itemsCol.doc(String(datas.id)).update(datas).then(()=>{
          res();
        });
      }
      else {
        let id = new Date().getTime();
        datas.id = id;
        this.itemsCol.doc(String(id)).set(datas).then(()=>{
          res();
        })
      }
    });
  }
 
  delete(id) {
    return new Promise(res=>{
        this.itemsCol.doc(String(id.id)).delete().then(()=>{
        res();
      })
    });
  }
}
