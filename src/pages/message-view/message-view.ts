import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MessageView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message-view',
  templateUrl: 'message-view.html'
})
export class MessageViewPage {

  message: any = {};

  constructor(public navCtrl: NavController, private params: NavParams) {
    this.initPage();
  }

  ionViewDidLoad() {
    console.log('Hello MessageViewPage Page');
  }

  private initPage() {
    this.message = this.params.get('message');
  }

}
