import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {
  toast: any;

  constructor(private _toast: ToastController) { }

  show(msg: string, pos: string = 'bottom') {
    this._toast.create({
      message: msg,
      duration: 2000,
      position: pos
    }).present();
  }

  showWithClose(msg: string, css: string = 'err', pos: string = 'bottom', close: boolean = true) {
    this._toast.create({
      dismissOnPageChange: true,
      cssClass: css,
      position: pos,
      message: msg,
      showCloseButton: close,
      closeButtonText: 'Ok'
    }).present();
  }

}
