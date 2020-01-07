
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ToastController, AlertController, NavController } from 'ionic-angular';
import { CrudStorageProvider, ToastProvider, LoadingProvider, CrudApiProvider } from '../../../providers/providers';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AppState } from '../../../app/global.setting';
import { DatePipe } from '@angular/common'

@IonicPage()
@Component({
  selector: 'page-form-market-survey-offline',
  templateUrl: 'form-market-survey-offline.html',
})
export class FormMarketSurveyOfflinePage {
  title_page = 'Market Survey';
  token;
  username;
  id_form;
  action: number;
  data: any = {};
  forms: any = [];
  
  formData = {};

  constructor(private view: ViewController, private toast: ToastProvider, private loading: LoadingProvider,  private crud: CrudStorageProvider, public params: NavParams, public http : Http, public toastCtrl:ToastController, private alertCtrl: AlertController, public navCtrl: NavController, private geolocation: Geolocation, private global : AppState, private datepipe : DatePipe, private crud_api: CrudApiProvider) {
    //this.loading.present();
    this.action = params.data.action;
    this.data = params.data.data;
    this.forms = {
      id_objective_location : [
        {
          value : '1',
          title : 'New Demand'
        },
        {
          value : '2',
          title : 'Red Site'
        },
        {
          value : '3',
          title : 'VIP'
        },
        {
          value : '4',
          title : 'WLC'
        },
      ],
      region : [
        {
          value : 'Jawa Barat',
          title : 'Jawa Barat'
        }
      ],
      branch : [
        {
          value : 'BANDUNG',
          title : 'BANDUNG'
        },
        {
          value : 'CIREBON',
          title : 'CIREBON'
        },
        {
          value : 'SOREANG',
          title : 'SOREANG'
        },
        {
          value : 'TASIKMALAYA',
          title : 'TASIKMALAYA'
        },
      ],
      sub_branch : [
        {
          value : 'BANDUNG BARAT',
          title : 'BANDUNG BARAT'
        },
        {
          value : 'BANDUNG TIMUR',
          title : 'BANDUNG TIMUR'
        },
        {
          value : 'SUBANG',
          title : 'SUBANG'
        },
        {
          value : 'CIREBON',
          title : 'CIREBON'
        },
        {
          value : 'INDRAMAYU',
          title : 'INDRAMAYU'
        },
        {
          value : 'KUNINGAN',
          title : 'KUNINGAN'
        },
        {
          value : 'CIANJUR',
          title : 'CIANJUR'
        },
        {
          value : 'SOREANG',
          title : 'SOREANG'
        },
        {
          value : 'SUMEDANG',
          title : 'SUMEDANG'
        },
        {
          value : 'CIAMIS',
          title : 'CIAMIS'
        },
        {
          value : 'GARUT',
          title : 'GARUT'
        },
        {
          value : 'TASIKMALAYA',
          title : 'TASIKMALAYA'
        },
      ],
      id_road_condition : [
        {
          value : '1',
          title : 'Asphalt'
        },
        {
          value : '2',
          title : 'Coral'
        },
        {
          value : '3',
          title : 'Etc'
        },
      ],
      id_building_available : [
        {
          value : '1',
          title : 'Pasar'
        },
        {
          value : '2',
          title : 'Sekolah'
        },
        {
          value : '3',
          title : 'Instansi'
        },
        {
          value : '4',
          title : 'Alun-alun'
        },
        {
          value : '5',
          title : 'Pelabuhan'
        },
        {
          value : '6',
          title : 'Bandara'
        },
        {
          value : '7',
          title : 'Etc'
        },
      ],
      telkomsel_signal_quality : [
        {
          value : '1',
          title : 'No Signal'
        },
        {
          value : '2',
          title : 'Not Stable'
        },
        {
          value : '3',
          title : 'Good'
        },
      ],
      strongest_band : [
        {
          value : '2G',
          title : '2G'
        },
        {
          value : '3G',
          title : '3G'
        },
        {
          value : '4G',
          title : '4G'
        },
      ],
      competitor_coverage : [
        {
          value : 'Indosat',
          title : 'Indosat'
        },
        {
          value : 'XL',
          title : 'XL'
        },
        {
          value : 'Smartfren',
          title : 'Smartfren'
        },
        {
          value : 'Others',
          title : 'Others'
        },
      ],
      id_owner : [
        {
          value : '1',
          title : 'Telkomsel'
        },
        {
          value : '2',
          title : 'Other Party'
        },
        
      ],
    };
    if(this.action == 1){
      this.token = this.global.get("token");
      let now = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.geolocation.getCurrentPosition().then((resp) => {
        this.crud_api.getUserLogin().then(data => {
          this.username = data.data.username;
          this.formData = {
            created_by : this.username,
            id_market_survey : "",
            survey_date : now,
            token : this.token,
            longitude: resp.coords.longitude,
            latitude : resp.coords.latitude,
            cellular_coverage_at_surrounding_location : [
              {
                competitor_coverage : '',
              },
              {
                competitor_coverage : '',
              },
              {
                competitor_coverage : '',
              },
              {
                competitor_coverage : '',
              },
            ],
            nearby_site_market_information : [
              {
                site_id_nearby_site_market_information : '',
                longitude_nearby_site_market_information : '',
                latitude_nearby_site_market_information : '',
                distance_nom : '',
                owner_nearby_site_market_information : '',
              },
              {
                site_id_nearby_site_market_information : '',
                longitude_nearby_site_market_information : '',
                latitude_nearby_site_market_information : '',
                distance_nom : '',
                owner_nearby_site_market_information : '',
              },
              {
                site_id_nearby_site_market_information : '',
                longitude_nearby_site_market_information : '',
                latitude_nearby_site_market_information : '',
                distance_nom : '',
                owner_nearby_site_market_information : '',
              },
              {
                site_id_nearby_site_market_information : '',
                longitude_nearby_site_market_information : '',
                latitude_nearby_site_market_information : '',
                distance_nom : '',
                owner_nearby_site_market_information : '',
              },
            ],
          }
        });
      }).catch((error) => {
          console.log('Error getting location', error);
      });
    } else {
      this.formData = params.data.data;
    }
    this.loading.dismiss();
  }

  submit(){
    this.loading.present();
    console.log(this.formData)
    this.crud.create(this.formData, this.action).then(data => {
      console.log(data);

      let alert = this.alertCtrl.create({
        title: 'Save Data',
        message: 'Data Inserted',
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
    this.view.dismiss(this.formData);
    
  }

  close(){
    this.view.dismiss();
  }

  addItem(param, id){
    let src = document.getElementById(param);
    let clone = src.cloneNode(true);
    document.getElementById(id + param).appendChild(clone);
  }

  removeItem(param){
    let elem = document.getElementsByClassName(param);
    let count = elem.length;
		if(count > 1){
      elem[(count - 1)].remove();
		} else {
      const toast = this.toastCtrl.create({
        message: 'Cannot Remove Because Only One Row',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
		}
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
