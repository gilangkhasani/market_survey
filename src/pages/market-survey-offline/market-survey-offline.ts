
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavParams, ActionSheetController, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { LoadingProvider, CrudStorageProvider, ToastProvider, CrudApiProvider } from '../../providers/providers';
import { Http } from '@angular/http';
import { AppState } from '../../app/global.setting';

@IonicPage()
@Component({
  selector: 'page-market-survey-offline',
  templateUrl: 'market-survey-offline.html',
})
export class MarketSurveyOfflinePage {
  title_page = 'Market Survey';
  items: any = [];
  token;

  constructor(public loading: LoadingProvider, public modal: ModalController, public navParams: NavParams, private crud: CrudStorageProvider, public http : Http, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public toast: ToastProvider, public loadingCtrl : LoadingController, public global: AppState, private api: CrudApiProvider, private alertCtrl : AlertController) {
    this.token = global.get('token');
  }

  ionViewDidLoad() {
    this.loadAllData();
  }

  loadAllData(){
    this.loading.present();
    this.crud.getUserLogin().then(data => {
      let created_by = data.data.username;
      this.crud.readAllData(created_by).then((res) => {
        this.items = res;
      });
    });
    
    this.loading.dismiss();
  }

  add() {
    this.loading.present();
    let modal = this.modal.create('FormMarketSurveyOfflinePage', {action: 1});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.loadAllData();
    });
  }

  edit(item) {
    let modal = this.modal.create('FormMarketSurveyOfflinePage', {data: item, action: 2});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.loadAllData();
    });
  }

  viewDetail(item) {
    let modal = this.modal.create('ViewDetailOfflinePage', {data: item});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.loadAllData();
    });
  }

  delete(item, index) {
    this.loading.present();
    this.crud.delete(item);
    const toast = this.toastCtrl.create({
      message: 'Data Deleted',
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
    this.loading.dismiss();
    this.loadAllData();
  }

  doRefresh(refresher) {
    this.loadAllData();
    refresher.complete();
  }

  syncMarket(item){
    //this.crud.delete(item);
    
    // if(item.attach_file){
    //   this.api.save(item, item.token).then(data => {
    //     this.crud.delete(item);
  
    //     let alert = this.alertCtrl.create({
    //       title: 'Sync Data',
    //       message: 'Sync Data Completed',
    //       cssClass: 'basic-alert',
    //       buttons: ['Ok']
    //     });
    //     alert.present()
    //     this.loading.dismiss();
    //   }, err => {
    //     console.log(err);
    //     this.loading.dismiss();
    //     this.toast.showWithClose(err);
    //   });
    // } else {
    //   const toast = this.toastCtrl.create({
    //     message: 'You have not attached a photo',
    //     duration: 4000,
    //     showCloseButton: true,
    //     closeButtonText: 'Ok'
    //   });
    //   toast.present();
    // }
    //this.loading.present();
    this.api.save(item, item.token).then(data => {
      this.crud.delete(item);

      let alert = this.alertCtrl.create({
        title: 'Sync Data',
        message: 'Sync Data Completed',
        cssClass: 'basic-alert',
        buttons: ['Ok']
      });
      alert.present()
      //this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
      this.toast.showWithClose(err);
    });
    
    this.loadAllData();
  }

  showActionSheet(item, index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'View Detail',
          icon: !this.platform.is('ios') ? 'information-circle' : null,
          handler: () => {
            this.viewDetail(item);
            console.log('View Detail clicked');
          }
        },
        {
          text: 'Sync',
          icon: !this.platform.is('ios') ? 'sync' : null,
          handler: () => {
            this.syncMarket(item);
          }
        },
        {
          text: 'Attach Foto',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.modal.create('FormAttachFotoOfflinePage', {action: 1, data: item}).present();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.edit(item);
            console.log('Edit clicked');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.delete(item, index);
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}