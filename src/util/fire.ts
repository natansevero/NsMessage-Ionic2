import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

//declare var firebase: any;

@Injectable()
export class Fire {

  user: any = {};

  constructor() {
    var config = {
      apiKey: "AIzaSyA8lC7FchX17enBwTSvGZ0_xuQ0tare7mo",
      authDomain: "nsmessage-154f6.firebaseapp.com",
      databaseURL: "https://nsmessage-154f6.firebaseio.com",
      storageBucket: "nsmessage-154f6.appspot.com",
      messagingSenderId: "834531657327"
    };

    firebase.initializeApp(config);
  }

  login(token : string, pushId: string, successCallback, errorCallback) : void {
    let credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase.auth().signInWithCredential(credential).then(response => {
      this.setUser(token, pushId, response.providerData[0]);
      console.log("sucesso!!");
      successCallback();
    }, error => {
      console.log("auth() error: " , error);
      errorCallback(error);
    });
  }

  getDb() : any {
    return firebase;
  }

  getUser(id, successCalback) {
    let ref = firebase.database().ref('users').child(id);

    //O once() serve para trazer uma informação uma vez. Não fica em real-time
    ref.once('value', snapshot => {
      let user = snapshot.val();
      successCalback(user);
    })
  }

  private setUser(token : string, pushId: string, authData: any) : void {
    this.user.name = authData.displayName;
    this.user.photo = authData.photoURL;
    this.user.id = authData.uid;
    this.user.token = token;
    this.user.pushId = pushId;

    this.saveUser();
  }

  private saveUser() : void {
    //É passado o local onde ficará salvos o novo dado, em 'users'
    firebase.database().ref('users').child(this.user.id).set({
      name: this.user.name,
      photo: this.user.photo,
      pushId: this.user.pushId
    });
    console.log("saveUser!");
  }
}
