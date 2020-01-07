
import { Component  } from '@angular/core';
import { IonicPage, AlertController, Platform, ViewController, ActionSheetController, normalizeURL, NavParams } from 'ionic-angular';
import { ToastProvider, CrudStorageProvider, LoadingProvider } from '../../../providers/providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

@IonicPage()
@Component({
  selector: 'page-form-attach-foto-offline',
  templateUrl: 'form-attach-foto-offline.html',
})
export class FormAttachFotoOfflinePage {
    public base64Image: string;
    errorMessage: string;
    file_name: any;
    pic_blob : any;
    category: any;
    id_market_survey;
    remark : any;
    token;
    survey_date;
    created_by;
    id_objective_location;
    actions;
    formData = {};

    constructor(
        public crop: Crop, 
        public camera: Camera, 
        public platform: Platform,
        public alertCtrl: AlertController,
        private view: ViewController,
        private action: ActionSheetController,
        private toast: ToastProvider,
        public params: NavParams,
        private crud: CrudStorageProvider,
        private loading: LoadingProvider
    ) {
      this.formData = params.data.data;
      this.formData['attach_file'] = [
          {'pic_blob': '', 'category' : '', 'remark' : ''}, 
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
          {'pic_blob': '', 'category' : '', 'remark' : ''},
      ];
      this.token = params.data.data.token;
      this.survey_date = params.data.data.survey_date;
      this.id_objective_location = params.data.data.id_objective_location;
      this.id_market_survey = params.data.data.id_market_survey;
      this.created_by = params.data.data.created_by;
      this.actions = params.data.action;
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
        this.pic_blob[index] = base64Image;
        this.category[index] = category;
        this.remark[index]  = category + "_" + index;
        
        this.formData['attach_file'][index]['pic_blob'] = base64Image;
        this.formData['attach_file'][index]['category'] = category;
        this.formData['attach_file'][index]['remark'] = category + "_" + index;
        
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
        let base64Image = "data:image/jpeg;base64," + data;
        this.pic_blob[index] = base64Image;
        this.category[index] = category;
        this.remark[index]  = category + "_" + index;
        
        this.formData['attach_file'][index]['pic_blob'] = base64Image;
        this.formData['attach_file'][index]['category'] = category;
        this.formData['attach_file'][index]['remark'] = category + "_" + index;
        
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
        created_by : this.created_by,
        token : this.token,
        survey_date : this.survey_date,
        id_objective_location : this.id_objective_location,

        category : this.category,
        pic_blob:this.pic_blob,
        file_name : this.file_name,
        remark : this.remark,
        id_market_survey : this.id_market_survey
      };

      console.log(this.formData)
      this.crud.update(this.formData);
      let alert = this.alertCtrl.create({
        title: 'Save Data',
        message: 'Image Inserted',
        cssClass: 'basic-alert',
        buttons: ['Ok']
      });
      alert.present()
      this.loading.dismiss();
      // this.crud.createAttach(item, this.actions).then(data => {
      //   console.log(data);
  
      //   let alert = this.alertCtrl.create({
      //     title: 'Save Data',
      //     message: 'Data Inserted',
      //     cssClass: 'basic-alert',
      //     buttons: ['Ok']
      //   });
      //   alert.present()
      //   this.loading.dismiss();
      // }, err => {
      //   console.log(err);
      //   this.loading.dismiss();
      //   this.toast.showWithClose(err);
      //   this.close();
      // });
      this.view.dismiss(item);
    }
}
