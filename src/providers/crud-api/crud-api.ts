import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConstantVariable } from '../../app/constant-variable';
import 'rxjs/add/operator/map';
import { AppState } from '../../app/global.setting';

const SERVER_URL:any = {
    getForms   : ConstantVariable.apiURLMarketSUrvey + 'form-api.php',
    crud : ConstantVariable.apiURLMarketSUrvey + 'crud-api.php',
    getLimit    : ConstantVariable.apiURLMarketSUrvey + 'limit.php',
    getData    : ConstantVariable.apiURLMarketSUrvey + 'crud-api.php',
    getLogin    : ConstantVariable.apiURLMarketSUrvey + 'login.php',
    getLogout    : ConstantVariable.apiURLMarketSUrvey + 'logout.php',
    uploadImage    : ConstantVariable.apiURLMarketSUrvey + 'upload-api.php',
    changePassword    : ConstantVariable.apiURLMarketSUrvey + 'users-api.php',
    changeStatus    : ConstantVariable.apiURLMarketSUrvey + 'change-status-api.php',
};
/*
  Generated class for the CrudApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrudApiProvider {

    private users: string = 'users';
    limitData:number = 10;
    datas: any = [];
    dataLogin = {}

    constructor(public http: Http, private storage: Storage, private global : AppState) {
        this.datas = null;
    }

    read(token) {
        return new Promise(resolve => {
            this.http.get(SERVER_URL.crud + '?token=' + token + '&type=read').map(res => res.json()).subscribe(data => {
                resolve(data.result);
            });
        });
    }

    generateForms(token, id_form){
      return new Promise(resolve => {
        this.http.get(SERVER_URL.getForms + '?token=' + token + '&id_form=' + id_form).map(res => res.json()).subscribe(data => {
          resolve(data.result);
        });
     });
    }

    getDataLimit(start:number=0, token, roles, username, rtp) {
        return new Promise(resolve => {
            this.http.get(SERVER_URL.crud+'?type=read&token=' + token + '&start=' + start + '&limitData=' + this.limitData + "&roles=" + roles + '&created_by=' + username + '&sub_branch=' + rtp)
            .map(res => res.json())
            .subscribe(data => {
                this.datas = data.result;
                resolve(this.datas);
            });
        });
    }

    save(item, token) {
        let headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
            options  : any      = new RequestOptions({ headers: headers });

        if (item.id_market_survey) {
            return new Promise((resolve, reject) => { 
                this.http.post(SERVER_URL.crud + '?token=' + token + '&type=update', item, options).map(res => res.json()).subscribe((data) => {
                    console.log(data);
                    resolve(data.msg);
                }, (err)=>{
                    reject(err);
                    console.log("error: "+err);
                });
            });
        } else {
            return new Promise(resolve => {
                this.http.post(SERVER_URL.crud + '?token=' + token + '&type=insert', item, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    resolve(data.msg);
                }, error => {
                    console.log("error "+error);
                });
            });
        }
    }
    
    delete(id, token) {
        return new Promise((resolve, reject) => { 
            this.http.get(SERVER_URL.crud + '?token=' + token + '&type=delete&id_market_survey=' + id).map(res => res.json()).subscribe(data => {
                console.log(data);
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    getLogin(item){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
             options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.getLogin, item, options).map(res => res.json()).subscribe((response) => {
                this.storage.set(this.users, { token : response.token, data : response.result, loggedIn : true, userImage : "https://itbsjabartsel.com/marvel/img/profile/" + response.result.user_image });
                this.global.set("token", response.token);
                this.global.set("username", response.result.username);
                resolve(response)
            }, (err)=>{
                reject(err);
                console.log("error: "+err);
            });
        });
    }

    changePassword(item, token){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
             options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.changePassword  + '?token=' + token + '&type=change-password', item, options).map(res => res.json()).subscribe((data) => {
                resolve(data.msg);

            }, (err)=>{
            reject(err);
            console.log("error: "+err);
            });
        });
    }

    getLogout(item){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
             options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.getLogout, item, options).map(res => res.json()).subscribe((data) => {
                resolve(data);
                this.storage.remove(this.users);
            }, (err)=>{
            reject(err);
            console.log("error: "+err);
            });
        });
    }

    getUserLogin(){
        return this.storage.get(this.users).then((data) => {
            return data;
        });
    }

    uploadUsersImage(item, token){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
                options  : any      = new RequestOptions({ headers: headers });
        console.log(item);
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.uploadImage + '?type=upload-users-image&token=' + token, item, options).map(res => res.json()).subscribe((data) => {
                resolve(data.file_name);
            }, (err)=>{
            reject(err);
                console.log("error: "+err);
            });
        });
    }

    uploadImage(item, token){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
                options  : any      = new RequestOptions({ headers: headers });
        console.log(item);
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.uploadImage + '?type=upload-image&token=' + token, item, options).map(res => res.json()).subscribe((data) => {
                console.log(data)
                resolve(data.file_name);
            }, (err)=>{
            reject(err);
                console.log("error: "+err);
            });
        });
    }

    saveUploadImage(item, token){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
                options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.uploadImage + '?type=save-upload-image&token=' + token, item, options).map(res => res.json()).subscribe((data) => {
                console.log(data)
                resolve(data.msg);
            }, (err)=>{
            reject(err);
                console.log("error: "+err);
            });
        });
    }

    saveSyncUploadImage(item, token){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
                options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.uploadImage + '?type=sync-upload-image&token=' + token, item, options).map(res => res.json()).subscribe((data) => {
                console.log(data)
                resolve(data.msg);
            }, (err)=>{
            reject(err);
                console.log("error: "+err);
            });
        });
    }

    submitMarketSurvey(item, token, status_market_survey){
        let  headers  : any      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
                options  : any      = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => { 
            this.http.post(SERVER_URL.changeStatus + '?type=change-status&id_market_survey=' + item.id_market_survey + '&status_market_survey=' + status_market_survey  + '&username=' + item.created_by + '&token=' + token, item, options).map(res => res.json()).subscribe((data) => {
                console.log(data)
                resolve(data.msg);
            }, (err)=>{
            reject(err);
                console.log("error: "+err);
            });
        });
    }
}
