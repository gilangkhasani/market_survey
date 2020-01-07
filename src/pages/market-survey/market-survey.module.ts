import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketSurveyPage } from './market-survey';

@NgModule({
  declarations: [
    MarketSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketSurveyPage),
  ],
})
export class MarketSurveyPageModule {}
