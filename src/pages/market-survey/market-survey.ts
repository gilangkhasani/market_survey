
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { LoadingProvider, CrudApiProvider, ToastProvider } from '../../providers/providers';
import { Http } from '@angular/http';
import { AppState } from '../../app/global.setting';

@IonicPage()
@Component({
  selector: 'page-market-survey',
  templateUrl: 'market-survey.html',
})
export class MarketSurveyPage {
  title_page = 'Market Survey';
  items: any = [];
  token;
  private start:number = 0;
  public loader = this.loadingCtrl.create({content: 'Please wait...', duration: 10000});

  constructor(public loading: LoadingProvider, public modal: ModalController, public navParams: NavParams, private crud: CrudApiProvider, public http : Http, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public toast: ToastProvider, public loadingCtrl : LoadingController, public global: AppState) {
    this.token = global.get('token');
  }

  ionViewDidLoad() {
    this.loader.present();
    this.load().then(data => 
      { this.loader.dismiss(); }      
    );
  }

  load() {
    //this.items = [];
    return new Promise(resolve => {
      this.crud.getUserLogin().then(data => {
        let roles = data.data.roles;
        let username = data.data.username;
        let rtp = data.data.rtp;
        
        this.crud.getDataLimit(this.start, this.token, roles, username, rtp)
        .then(datas => {
          for (let data in datas) {
            this.items.push(datas[data]);
          }
          resolve(true);
        });
      });
    });
  }

  loadAllData(){
    this.items = [];
    this.loading.present();
    this.crud.read(this.token).then((res) => {
        this.items = res;
        this.loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.start+=10;

    this.load().then(()=>{
      infiniteScroll.complete();
    });
  }

  add() {
    let modal = this.modal.create('FormMarketSurveyPage', {action: 1});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.load();
    });
  }

  edit(item) {
    let modal = this.modal.create('FormMarketSurveyPage', {data: item, action: 2});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.load();
    });
  }

  viewDetail(item) {
    let modal = this.modal.create('ViewDetailPage', {data: item});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) this.load();
    });
  }

  delete(id, index) {
    this.loading.present();
    this.crud.delete(id, this.token);
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
    this.start = 0;
    this.items = [];
    this.load();
    refresher.complete();
  }

  submitMarket(item){
    this.loading.present();
    this.crud.submitMarketSurvey(item, this.token, 'Submit').then(()=>{
      const toast = this.toastCtrl.create({
        message: 'Data Submited',
        duration: 4000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
      item.status_market_survey_update = 'Submit';
      this.load();
      this.loading.dismiss();
    });
  }

  showActionSheet(item, index, refresher) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'View Detail',
          icon: !this.platform.is('ios') ? 'information-circle' : null,
          handler: () => {
            this.viewDetail(item);
          }
        },
        {
          text: 'Submit',
          icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
          handler: () => {
            if(item.status_market_survey_update == 'Draft'){
              this.submitMarket(item);
            } else {
              const toast = this.toastCtrl.create({
                message: 'Status Already ' + item.status_market_survey_update,
                duration: 4000,
                showCloseButton: true,
                closeButtonText: 'Ok'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Attach Foto',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.modal.create('FormAttachFotoPage', {action: 1, id_market_survey: item.id_market_survey}).present();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            if(item.status_market_survey_update == 'Draft'){
              this.edit(item);
            } else {
              const toast = this.toastCtrl.create({
                message: 'Data Cannot Edit, Because Status is not Draft',
                duration: 4000,
                showCloseButton: true,
                closeButtonText: 'Ok'
              });
              toast.present();
            }
            
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.delete(item.id_market_survey, index);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

}