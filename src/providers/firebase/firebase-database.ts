import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseDatabaseProvider {

  itemsRef:AngularFireList<any>;

  constructor(public afd: AngularFireDatabase) {
    this.itemsRef = this.afd.list('ionium2/notes/');
  }

  get read() {
   return this.itemsRef;
  }

  save(datas) {
    console.log(datas);
    if (datas.id) {
      let tmp = datas.id; 
      console.log(datas);
      this.itemsRef.update(String(tmp), datas);
    }
    else {
      let id = new Date().getTime();
        datas.id = id;
      this.itemsRef.set(String(id),{
        id : id,
        title : datas.title,
        text : datas.text,
      });
    }
  }
 
  delete(id) {
    this.itemsRef.remove(String(id));
  }

}