import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkProvider {

  constructor(private network: Network) {
    this.network.onConnect().subscribe(data => {
      console.log(data)
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
    }, error => console.error(error));
  }

}
