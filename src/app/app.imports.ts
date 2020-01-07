//Used for setting
import { ConstantVariable } from './constant-variable';

//used for Firebase
const firebaseConfig = {
    apiKey              : ConstantVariable.apiKey,
    authDomain          : ConstantVariable.authDomain,
    databaseURL         : ConstantVariable.databaseURL,
    projectId           : ConstantVariable.projectId,
    storageBucket       : ConstantVariable.storageBucket,
    messagingSenderId   : ConstantVariable.messagingSenderId
  };

//Used for Theming
import { AppState } from './global.setting';

//MODULE
import { Http, HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { SwingModule } from 'angular2-swing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//PROVIDER
import { LoadingProvider, ToastProvider, CrudStorageProvider, CrudApiProvider, NetworkProvider } from '../providers/providers';

//NATIVE
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Camera } from '@ionic-native/camera';
import { CallNumber  } from '@ionic-native/call-number';
import { Crop } from '@ionic-native/crop';
import { DatePicker } from '@ionic-native/date-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Push } from '@ionic-native/push';
import { Network } from '@ionic-native/network';

//DIRECTIVES
//import { Autosize } from '../components/autosize/autosize';

//PIPES
import { CapitalizePipe } from '../pipes/capitalize.pipe';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const firebaseConfigEx = firebaseConfig;

export const MODULES = [
    SwingModule,
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    IonicStorageModule.forRoot({
        name: '_ionium2',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
];

export const PROVIDERS = [
    LoadingProvider,
    ToastProvider,
    CrudStorageProvider,
    CrudApiProvider,
    AppState,
    NetworkProvider,
];

export const NATIVES = [
    SplashScreen,
    StatusBar,
    ActionSheet,
    Camera,
    CallNumber,
    Crop,
    DatePicker,
    Geolocation,
    LaunchNavigator,
    Push,
    Network,
];

export const COMPONENTS = [
    
];

export const DIRECTIVES = [
    
];

export const PIPES = [
    CapitalizePipe,
];
