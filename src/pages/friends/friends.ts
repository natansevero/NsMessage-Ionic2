import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Fire } from '../../util/fire';
import { FacebookLogin } from '../../util/facebook-login';
import { MessageMapPage } from '../message-map/message-map';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  friends: any = [];

  constructor(public navCtrl: NavController, private menuCtrl: MenuController,
              private fire : Fire) {
                this.initPage();
              }

  ionViewDidLoad() {
    console.log('Hello FriendsPage Page');
    this.menuCtrl.swipeEnable(true);
  }

  private initPage() : void {
    FacebookLogin.getFriends(this.fire.user, friends => {
      console.log(friends);
      this.friends = friends;
    });
  }

  openMap(friend) : void {
    this.navCtrl.push(MessageMapPage, { friend });
  }

}
