import { SharedModule } from './shared.module';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';  //enableProdMode : make development faster
//import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { MODULES, PROVIDERS, NATIVES  } from './app.imports';
import { CrudApiProvider } from '../providers/crud-api/crud-api';
import { NetworkProvider } from '../providers/network/network';
import { DatePipe } from '@angular/common'

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PROVIDERS,
    NATIVES,
    CrudApiProvider,
    NetworkProvider,
    DatePipe,
  ]
})
export class AppModule {
}

