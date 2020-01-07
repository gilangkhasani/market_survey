import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketSurveyOfflinePage } from './market-survey-offline';

@NgModule({
  declarations: [
    MarketSurveyOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(MarketSurveyOfflinePage),
  ],
})
export class MarketSurveyOfflinePageModule {}
