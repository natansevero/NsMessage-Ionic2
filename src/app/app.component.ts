import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';

import { Push } from '../util/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  pages: Array<{component: any, page: string}>

  constructor(platform: Platform, private menuCtrl: MenuController) {

    this.pages = [
      {component: HomePage, page: 'Home'},
      {component: FriendsPage, page: 'Amigos'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      Push.init();
    });
  }

  openPage(page: any) : void {
   this.rootPage = page.component;
   this.menuCtrl.close();
 }
}
