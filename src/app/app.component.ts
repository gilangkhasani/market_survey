
import { Component, ViewChild } from '@angular/core';
import { Events, Config, AlertController, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { AppState, PAGES } from './global.setting';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CrudApiProvider } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  token:any;
  rootPage:any;
  pages:any[];
  activePage = new Subject();
  userData:any;
  isLogin:boolean;

  constructor(
    public platform: Platform,
    public events: Events,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public push: Push,
    public global: AppState,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public translate:TranslateService,
    public config:Config,
    public api:CrudApiProvider,
  ) {
    this.initTranslate();
    this.initializeApp();

    this.isLogin = false;
    this.token = '';
    
    //Main Menu
    this.pages = PAGES;
    //user data after login
    this.userData = {
      data : {
        fullname:"MARVEL",
        email:"ionicpremium@gmail.com",
        photo:""
      }
    }

    this.api.getUserLogin().then(data => {
      if(data){
        this.token = data.token;
        this.isLogin = true;
        this.userData = data;
        this.rootPage = 'HomeListPage';
        global.set("token", this.token);
        global.set("isLogin", this.isLogin);
        global.set("userData", data);
      } else {
        this.rootPage = 'LoginListPage';
      }
    });

    this.events.subscribe('photo:selected', (photo) => {
      console.log(photo);
    });

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });      
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      //  Set your language here
       this.translate.use('en');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      this.initPushNotification();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(pages) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(pages.page, {action : pages.action});
    this.activePage.next(pages);
  }

  doLogout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure to logout',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.api.getLogout(this.userData).then(data => {
              this.isLogin = false;
              this.global.set("isLogin", false);
              const alert = this.alertCtrl.create({
                title: 'Logout',
                subTitle: 'Thanks for Logout.',
                buttons: ['OK']
              });
              alert.present();
              this.nav.setRoot("LoginListPage");
            }, err => {
              console.log(err);
              const alert = this.alertCtrl.create({
                title: 'Logout!',
                subTitle: 'Loged Out Failed.',
                buttons: ['Dismiss']
              });
              alert.present();
            });  
          }
        }
      ]
    });
    confirm.present();
  }

  //PUSH NOTIFICATION
  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              this.nav.push('NotifDetailPage', { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push('NotifDetailPage', { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
  
}

