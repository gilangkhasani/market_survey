import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, Platform, AlertController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CrudApiProvider, ToastProvider } from '../../../providers/providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile-one',
  templateUrl: 'profile-one.html'
})
export class ProfileOnePage {
  posts = [];
  imageUrl: string = 'https://itbsjabartsel.com/marvel/img/profile/profile-cover.jpg';
  userImage: string;
  //userImage: string = 'https://itbsjabartsel.com/marvel/img/profile/profile-2.jpg';
  users = {
    fullname : '',
    email : '',
    subdept : '',
  };
  token = '';

  constructor(
    public navCtrl: NavController, 
    public camera: Camera, 
    private action: ActionSheetController,
    public platform: Platform,
    private crud: CrudApiProvider,
    private toast: ToastProvider,
    private alertCtrl: AlertController,
    public modal: ModalController,
    private storage: Storage
  ){
    this.load();
  }

  load(){
    this.crud.getUserLogin().then(data => {
      this.token = data.token;
      this.users = data.data;
      this.userImage = data.userImage;
    });
  }

  changePassword(){
    let modal = this.modal.create('ChangePasswordPage', {data: this.users, action: 1, token : this.token});
    modal.present();
    modal.onDidDismiss(data => {
      if(data) this.load();
    });
  }

  changeImage(){
    this.action.create({
      title: 'Take Picture via gallery or camera',
      buttons: [{
          text: 'Album',
          handler: () => {
            this.takeGallery();
          }
        },{
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  takeGallery(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100, 
      correctOrientation: true, 
      encodingType: this.camera.EncodingType.JPEG, 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, 
      targetWidth: 480, 
    };
    this.camera.getPicture(options).then((data) => {
      let base64Image = "data:image/jpeg;base64," + data;
      let item = {
        username : this.users,
        pic_blob : base64Image,
      };
      this.userImage = base64Image;
      this.crud.uploadUsersImage(item, this.token).then((res) => {
        let alert = this.alertCtrl.create({
          title: 'Upload Users Photo',
          message: 'Image Saved',
          cssClass: 'basic-alert',
          buttons: ['Ok']
        });
        alert.present();
        this.saveToStorage(res);
      });
      
    }, (err) => {
      console.log(err);
      this.toast.showWithClose(err); 
    });
  }

  takePicture() {
    const options: CameraOptions = { 
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100,
      targetWidth: 480,
    };
    
    this.camera.getPicture(options).then((data) => {
      let base64Image = "data:image/jpeg;base64," + data;
      let item = {
        username : this.users,
        pic_blob : base64Image,
      };
      this.userImage = base64Image;
      this.crud.uploadUsersImage(item, this.token).then((res) => {
        let alert = this.alertCtrl.create({
          title: 'Upload Users Photo',
          message: 'Image Saved',
          cssClass: 'basic-alert',
          buttons: ['Ok']
        });
        alert.present();
        this.saveToStorage(res);
      });
      
    }, function(err) {
      console.log(err);
      this.toast.showWithClose(err);
    });
  }

  saveToStorage(userImage){
    
    this.storage.get('users').then(valueStr => {
      let value = {
        data : valueStr.data,
        loggedIn : valueStr.loggedIn,
        token : valueStr.token,
        userImage : "https://itbsjabartsel.com/marvel/img/profile/" + userImage
      };
      // Save the entire data again
      this.storage.set('users', value);
    });
  }
}
