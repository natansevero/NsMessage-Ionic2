import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { MessageNewPage } from '../message-new/message-new';
import { MessageReadPage } from '../message-read/message-read';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messageNew: any;
  messageRead: any;

  constructor(private navCtrl: NavController, private menuCtrl: MenuController) {
    this.messageNew = MessageNewPage;
    this.messageRead = MessageReadPage;
  }

  ionViewDidLoad() {
    console.log('Hello MessageNewPage Page');
    this.menuCtrl.swipeEnable(true);
  }
}
