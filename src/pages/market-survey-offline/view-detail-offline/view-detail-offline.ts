
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-detail-offline',
  templateUrl: 'view-detail-offline.html',
})
export class ViewDetailOfflinePage {

  market_survey: string = "data";
  formData = {};
  attach = {};

  constructor(public navCtrl: NavController, public params: NavParams, private view: ViewController) {
    this.formData = params.data.data;
    // this.attach = this.crud.getDataMarketSurveyByAttachFile(params.data.data);
    //this.attachFile = params.data.data;
  }

  close(){
    this.view.dismiss();
  }

}
