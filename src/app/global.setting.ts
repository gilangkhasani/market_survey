

export const LISTMENUSETTING = [
    { title: 'Language', component: 'LanguagePage' },
    { title: 'Theme', component: 'ThemingPage' },
];

export const LISTAVAILABLELANGUAGE = [
    { title: 'English', value: 'en' },
    { title: 'France', value: 'fr' },
    { title: 'Turkey', value: 'tr' },
    { title: 'Hindi', value: 'hi' },
    { title: 'China', value: 'ch' },
    { title: 'Indonesia', value: 'id' },
]

//Main Menu1
export const PAGES = [
    { icon: 'apps', title: 'Home', page: 'HomeListPage', active: true, },
    { icon: 'paper', title: 'Market Survey', page: 'MarketSurveyPage', active: false, },
    { icon: 'paper', title: 'Offline Market Survey', page: 'MarketSurveyOfflinePage', active: false, },
    { icon: 'person', title: 'Profile', page: 'ProfileListPage', active: false, },
    { icon: 'settings', title: 'Setting', page: 'SettingListPage', active: false },
];

//Main Menu Accordion, Next Update
export const TABMENU = [
    { icon: 'water', title: 'Water', url:"CrudHttpListPage", active: true },
    { icon: 'leaf', title: 'Life',  url:"CrudHttpListPage", active: false, },
    { icon: 'flame', title: 'Fire',  url:"CrudHttpListPage", active: false, },
    { icon: 'magnet', title: 'Force',  url:"CrudHttpListPage", active: false, },
];


import { Injectable } from '@angular/core';
@Injectable()
export class AppState {
  checkLogin: boolean;
  _state = {};

  // already return a clone of the current state
  get state() {
    return this._state = this.clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
