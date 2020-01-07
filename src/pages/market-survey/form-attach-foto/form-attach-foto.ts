
import { Component  } from '@angular/core';
import { IonicPage, AlertController, Platform, ViewController, ActionSheetController, normalizeURL, NavParams } from 'ionic-angular';
import { ToastProvider, CrudApiProvider, LoadingProvider } from '../../../providers/providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

@IonicPage()
@Component({
  selector: 'page-form-attach-foto',
  templateUrl: 'form-attach-foto.html',
})
export class FormAttachFotoPage {
    public base64Image: string;
    errorMessage: string;
    file_name: any;
    pic_blob : any;
    category: any;
    id_market_survey;
    remark : any;
    token;

    constructor(
        public crop: Crop, 
        public camera: Camera, 
        public platform: Platform,
        public alertCtrl: AlertController,
        private view: ViewController,
        private action: ActionSheetController,
        private toast: ToastProvider,
        public params: NavParams,
        private crud: CrudApiProvider,
        private loading: LoadingProvider,
    ) {
      this.token = params.data.token;
      this.id_market_survey = params.data.id_market_survey;
      this.file_name = [];
      this.remark = [];
      this.pic_blob = [];
      this.category = [];
    }

    close(){
      this.view.dismiss();
    }

    selectOptions(id, category, index){
      this.action.create({
        title: 'Take Picture via gallery or camera',
        buttons: [{
            text: 'Album',
            handler: () => {
              this.takeGallery(id, category, index);
            }
          },{
            text: 'Camera',
            handler: () => {
              this.takePicture(id, category, index);
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

    takeGallery(id, category, index){
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
          index : index,
          pic_blob : base64Image,
          category : category,
          id_market_survey : this.id_market_survey
        };
        this.crud.uploadImage(item, this.token).then((res) => {
          this.file_name[index] = res;
          this.pic_blob[index] = base64Image;
          this.category[index] = category;  
          this.remark[index]  = category + "_" + index;
        });
        
      }, (err) => {
        console.log(err);
        this.toast.showWithClose(err); 
      });
    }

    takePicture(id, category, index) {
      const options: CameraOptions = { 
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        quality: 100,
        targetWidth: 480,
      };

      this.camera.getPicture(options).then((data) => {
        let item = {
          index : index,
          pic_blob : "data:image/jpeg;base64," + data,
          category : category,
          id_market_survey : this.id_market_survey
        };
        this.crud.uploadImage(item, this.token).then((res) => {
          this.file_name[index] = res;
          this.pic_blob[index] = "data:image/jpeg;base64," + data;
          this.category[index] = category;
          this.remark[index]  = category + "_" + index;
        });
        
      }, function(err) {
        console.log(err);
        this.toast.showWithClose(err);
      });
    }

    normalize(url){
      return this.platform.is('ios') ? normalizeURL(url) : url;
    }

    submit(){
      let item = {
        category : this.category,
        file_name : this.file_name,
        remark : this.remark,
        id_market_survey : this.id_market_survey
      };
      this.loading.present();
      this.crud.saveUploadImage(item, this.token).then((data) => {
        let alert = this.alertCtrl.create({
          title: 'Save Attach Photo',
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

      this.view.dismiss();
    }

}
