import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Messages } from '../../util/messages';
import { Geolocation } from 'ionic-native';
import * as geolib from 'geolib';

import { MessageRoutePage } from '../message-route/message-route';
import { MessageViewPage } from '../message-view/message-view';

@Component({
  selector: 'page-message-read',
  templateUrl: 'message-read.html'
})
export class MessageReadPage {

  messagesList: any;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController,
              private messages: Messages) {

                this.initPage();

  }

  ionViewDidLoad() {
    console.log('Hello MessageReadPage Page');
    this.menuCtrl.swipeEnable(true);

  }

  //Abrir o mapa com rotas
  openRoute(message) {
    let directions = { latitude: message.lat, longitude: message.lng }

    this.navCtrl.push(MessageRoutePage, { directions });
  }

  openMessage(message){
    this.navCtrl.push(MessageViewPage, {message});
  }

  private initPage() {
    this.messagesList = [];

    this.messages.get(true, message => {
      this.messagesList.push(message);
      console.log("MessageList: " + this.messagesList);
    });
  }

}
