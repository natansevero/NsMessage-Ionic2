import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { HomePage } from  '../home/home';

import { FacebookLogin } from '../../util/facebook-login';
import { Fire } from '../../util/fire';
import { Push } from '../../util/push';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private fire: Fire,
              private menuCtrl: MenuController) {

              }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
    this.menuCtrl.swipeEnable(false);
  }

  onLogin() : void {
    FacebookLogin.login(response => {

      Push.getPushId((id) => {
        this.fire.login(response.accessToken, id, () => {
          this.navCtrl.setRoot(HomePage);
        } , (error) => {
          console.log("Fire.login: Eror: " , error);
          alert(error);
        })
      });


    }, error => {
      alert(error);
    });
  }

}
