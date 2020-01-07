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
  selector: 'page-view-detail',
  templateUrl: 'view-detail.html',
})
export class ViewDetailPage {

  market_survey: string = "data";
  formData = {};

  constructor(public navCtrl: NavController, public params: NavParams, private view: ViewController,) {
    this.formData = params.data.data;
    console.log(this.formData)
  }

  close(){
    this.view.dismiss();
  }

}
