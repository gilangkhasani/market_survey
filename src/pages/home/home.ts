import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { PAGES, AppState } from '../../app/global.setting';
import { NetworkProvider, CrudStorageProvider, CrudApiProvider, LoadingProvider, ToastProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomeListPage {

  pages:any[];
  token;
  isLogin;
  userData;

  constructor( public navCtrl: NavController, public global: AppState, public network: NetworkProvider, private crud: CrudStorageProvider, private crudApi: CrudApiProvider, private loading:LoadingProvider, private toast:ToastProvider, private alertCtrl: AlertController) {
    this.global.checkLogin = true;
    this.token = global.get("token");
    this.isLogin = global.get("isLogin");
    this.userData = global.get("userData")
    //Main Menu
    this.pages = PAGES;
    
    //console.log(network)
  }

  showList(pages) {
    this.navCtrl.setRoot(pages.page, {action : pages.action});
  }

  syncData(){
    this.loading.present();
    let subtitle = '';
    let counter = 0;
    this.crud.getUserLogin().then(data => {
      let created_by = data.data.username;
      this.crud.readAllData(created_by).then((res) => {
        if(res.length > 0){
          for(let i = 0; i < res.length; i++){
            this.crudApi.save(res[i], this.token).then(data => { 
              // let dataFile = this.crud.getDataMarketSurveyAttachFile(res[i]);
              // this.crudApi.saveSyncUploadImage(dataFile, this.token).then(data => {
              // }, err => {
              //   console.log(err);
              //   this.loading.dismiss();
              //   this.toast.showWithClose(err);
              // });
            }, err => {
              console.log(err);
              this.loading.dismiss();
              this.toast.showWithClose(err);
            });
            counter++;
          }
          subtitle = 'Data Inserted ' + counter;
        } else {
          subtitle = 'Sync Data Not Found';
        }

        let alert = this.alertCtrl.create({
          title: 'Sync Data!',
          subTitle: subtitle,
          buttons: 
          [
            {
              text: 'OK',
              handler: () => {
                this.crud.deleteAllData();
              }
            }
          ]
        });

        alert.present()
        this.loading.dismiss();
      });
    });

    
  }

}
