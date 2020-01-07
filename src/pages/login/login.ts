
import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, App, LoadingController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudApiProvider } from '../../providers/providers';
import { AppState } from '../../app/global.setting';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginListPage {

  public loginForm: any = {username: '', password: ''};
  public backgroundImage = 'assets/img/background/background-5.jpg';
  private form: FormGroup;
  action: number;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    private fb: FormBuilder, 
    private api: CrudApiProvider,
    public navCtrl: NavController, 
    public params: NavParams,
    public global : AppState
    
  ) { 
    this.action = params.data.action;
    this.global.set("isLogin", false);
    this.form = this.fb.group({
      username: [this.loginForm && this.loginForm.username, Validators.required],
      password: [this.loginForm && this.loginForm.password, Validators.required]
    });
  }

  logout(data){

    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure to logout',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.api.getLogout(data).then(data => {
              console.log(data)
              const alert = this.alertCtrl.create({
                title: 'Logout',
                subTitle: 'Thanks for Logout.',
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot("LoginListPage");
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

  login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.present();

    loading.onDidDismiss(() => {
      this.api.getLogin(this.form.value).then(data => {
        this.global.set("isLogin", true);
        this.global.set("userData", data);
        const alert = this.alertCtrl.create({
          title: 'Login!',
          subTitle: 'Thanks for Login.',
          buttons: 
          [
            {
              text: 'OK',
              handler: () => {
                this.redirectToHomePage()
              }
            }
          ]
        });
        alert.present();
      }, err => {
        console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Login!',
          subTitle: 'Login Failed.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
      
    });
  }

  redirectToHomePage(){
    this.navCtrl.setRoot("HomeListPage");
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

  step = 0;
  // color table indices for:
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.00005;
  gradient = '';

  updateGradient() {

    const c00 = this.colors[this.colorIndices[0]];
    const c01 = this.colors[this.colorIndices[1]];
    const c10 = this.colors[this.colorIndices[2]];
    const c11 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
    const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
    const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
    const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
    const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

    }

    setInterval(() => { this.updateGradient(); }, 40);
  }
}
