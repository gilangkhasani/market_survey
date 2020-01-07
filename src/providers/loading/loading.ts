import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  load: any;

  constructor(private loader: LoadingController) {}

  present() {
    this.load = this.loader.create({
      spinner: 'crescent',
      content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>Please wait ...</div>`
    });
    
    return this.load.present(); 
  }

  dismiss(){
    this.load.dismiss();
  }

  presentNoDissmiss() {
    this.load = this.loader.create({
      spinner: 'crescent',
      content: `
        <div class="loading-custom-spinner-container">
          <div class="loading-custom-spinner-box"></div>
        </div>
        <div>Please wait ...</div>`,
        dismissOnPageChange: true
    });
    
    return this.load.present(); 
  }
}
