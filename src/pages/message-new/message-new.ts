import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Messages } from '../../util/messages';
import { Geolocation } from 'ionic-native';
import * as geolib from 'geolib';

import { MessageRoutePage } from '../message-route/message-route';
import { MessageViewPage } from '../message-view/message-view';

@Component({
  selector: 'page-message-new',
  templateUrl: 'message-new.html'
})
export class MessageNewPage {

  messagesList: any;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController,
              private messages: Messages) {

                this.initPage();

  }

  ionViewDidLoad() {
    console.log('Hello MessageNewPage Page');
    this.menuCtrl.swipeEnable(true);

  }

  //Abrir o mapa com rotas
  openRoute(message) {
    let directions = { latitude: message.lat, longitude: message.lng }

    this.navCtrl.push(MessageRoutePage, { directions });
  }

  openMessage(message){
    if(this.isNear(message)) {
      this.navCtrl.push(MessageViewPage, {message});
      this.messages.setMessageRead(message).then(() => {
        this.removeMessageFromList(message);
      });
    } else {
      alert("Mensagem muito distante!");
    }
  }

  private removeMessageFromList(message) {
    let index = this.messagesList.indexOf(message);

    if(index >= 0) {
      this.messagesList.splice(index, 1);
    }
  }

  private isNear(message) {
    return message.distance <= 0.2;
  }

  private initPage() {
    this.messagesList = [];

    this.messages.get(false, message => {
      this.messagesList.push(message);
      console.log("MessageList: " + this.messagesList);
    });

    setInterval(() => {
      this.getAllDistances();
    }, 3000);
  }

  private getAllDistances() {
    Geolocation.getCurrentPosition().then(resp => {
      for(let i = 0; i < this.messagesList.length; i++){
        let message = this.messagesList[i];

        message.distance = this.getDistance(
          { latitude: resp.coords.latitude, longitude: resp.coords.longitude },
          { latitude: message.lat, longitude: message.lng }
        )
      }
    });
  }

  private getDistance(origin, destination) {
    let distance = geolib.getDistance(origin, destination);

    return Number(distance) / 1000;
  }

}
