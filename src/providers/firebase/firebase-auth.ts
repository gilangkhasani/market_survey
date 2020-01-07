import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class FirebaseAuthProvider {

    currentUser:firebase.User;
    currentUserKey:any;
    
    constructor(public afAuth: AngularFireAuth, public afd:AngularFireDatabase) {
      this.afAuth.authState.subscribe(result => {
        if(result !== null) {
          this.currentUser = result;
          this.getUserDB(result).snapshotChanges().subscribe(result=>{
            this.currentUserKey = result[0].key;
            let newObject = Object.assign({}, this.currentUser, result[0]);
            this.currentUser = newObject;
          });
        }
      });
    }

    public getUserInfo() {
      return this.currentUser;
    }

    public getUserDB(data) {
      if(data === null) { 
        return this.afd.list('ionium2/user/');
      }
      else{
        //Angular fire < 5
        // return this.afd.list('ionium2/user/', {
        //   query:{
        //     orderByChild:'email',            
        //     equalTo: data.email,
        //   }
        // });
        //Angular fire >= 5
        return this.afd.list('ionium2/user/', ref =>
          ref.orderByChild('email').equalTo(data.email)
        );
      }
    }

    public saveUserDB(proses, data) {
      return new Promise(resolve => {
        if (proses == "update")
          this.afd.list('ionium2/user/').update(this.currentUserKey, data);
        else 
          this.afd.list('ionium2/user/').push(data);
        resolve(true);
      });
    }

    doLogin(credentials) {
      return new Promise(resolve => {
        this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(
          result => {
            const dataProses = [true, result];
            resolve(dataProses);
          },
          error => {
            const dataProses = [false, error];
            resolve(dataProses);
          }
        )
        .catch(e => {
          const dataProses = [false, e];
          resolve(dataProses);
        });
      });
    }

    doLogout() {
      return Observable.create(observer => {
        this.afAuth.auth.signOut();
        observer.next(true);
        observer.complete();
      });
    }

    doRegister(credentials) {
      return Observable.create(observer => {
        this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then((result: any) => {
            console.log("Register Result: ", result);
            result = result.user;
            let dataUser = {
              name:credentials.name,
              email:credentials.email,
              uid:result.uid,
              emailVerified:result.emailVerified,
            };
            this.saveUserDB("push", dataUser);
            observer.next(result);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        )
        .catch(e => {
          observer.next(e);
          observer.complete();
        });
      });
    }

}
