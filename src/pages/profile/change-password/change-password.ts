
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CrudApiProvider, LoadingProvider, ToastProvider } from '../../../providers/providers';

/**
 * Generated class for the ChangePassword page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  formData = {};
  token;

  constructor(public navCtrl: NavController, public params: NavParams, private view: ViewController, private crud: CrudApiProvider, public loading: LoadingProvider, private alertCtrl: AlertController, private toast: ToastProvider) {
    this.formData = {
      old_password : '',
      new_password : '',
      confirm_new_password : '',
      username : params.data.data.username,
      password : params.data.data.password,
      
    };
    this.token = params.data.token;
    //this.formData = params.data.data;
  }

  submit(){
    this.loading.present();
    this.crud.changePassword(this.formData, this.token).then((data) => {
      let alert = this.alertCtrl.create({
        title: 'Save Data',
        message: data + '',
        cssClass: 'basic-alert',
        buttons: ['Ok']
      });
      alert.present()
      this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
      this.toast.showWithClose(err);
      this.close();
    });
    this.formData = {
      old_password : '',
      new_password : '',
      confirm_new_password : '',
    };
    this.view.dismiss(this.formData);
  }

  close(){
    this.formData = {
      old_password : '',
      new_password : '',
      confirm_new_password : '',
    };
    this.view.dismiss();
  }

}
