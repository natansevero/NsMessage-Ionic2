import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { Messages } from '../../util/messages';
import { Fire } from '../../util/fire';
import { Push } from '../../util/push';

declare var google: any;

@Component({
  selector: 'page-message-map',
  templateUrl: 'message-map.html'
})
export class MessageMapPage {

  friend: any;
  message: string;
  position: any = {};

  constructor(public navCtrl: NavController, platform: Platform,
              private params: NavParams, private messages: Messages, private fire: Fire) {
    platform.ready().then(() => {
      this.initPage();
    });
  }

  ionViewDidLoad() {
    console.log('Hello MessageMapPage Page');
  }

  private initPage() : void {
    this.friend = this.params.get('friend') || {};

    Geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    });
  }

  private getAddress(latLng, successCalback) : void {
    let geocoder = new google.maps.Geocoder;

    geocoder.geocode({location: latLng}, (results, status) => {
      if(status == google.maps.GeocoderStatus.OK){
        if (results[0]){
          successCalback(results[0].formatted_address);
        }
      }
    });
  }

  private loadMap(lat, lng) : void {
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let element = document.getElementById('map');

    let map = new google.maps.Map(element, mapOptions);

    let marker = new google.maps.Marker({
      position: latLng
    });

    marker.setMap(map);

    this.getAddress(latLng, address => {
      this.position.lat = latLng.lat();
      this.position.lng = latLng.lng();
      this.position.address = address;
    });
  }

  onSendMessage() : void {
    this.messages.send(this.friend, this.message, this.position).then(() => {

      this.fire.getUser(this.friend.id, user => {
        Push.send(this.messages.user, user, () => {
          this.navCtrl.pop();
        }, error => {
          alert(JSON.stringify(error)); 
        })
      });

    });
  }

}
