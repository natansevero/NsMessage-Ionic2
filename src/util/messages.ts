import { Injectable } from '@angular/core';
import { Fire } from './fire';

@Injectable()
export class Messages {
  firebase : any;
  user : any;

  constructor(private fire : Fire) {
    this.firebase = this.fire.getDb();
    this.user = this.fire.user;
  }

  //Gravar a msg no Firebase
  send(friend, message, position) {
    let ref = this.firebase.database().ref();

    //Uso o push para ele não sobreescrever o dado
    return ref.child('messages').child(friend.id).push().set({
      senderId: this.user.id, //Usuario que está enviando a msg, ou seja, quem está logado
      senderName: this.user.name,
      message: message,
      lat: position.lat,
      lng: position.lng,
      address: position.address,
      read: false
    });
  }

  //Pegar as mensagens
  get(read: boolean, successCalback) {
    let ref = this.firebase.database().ref('messages').child(this.user.id);

    ref.orderByChild('read').equalTo(read).on('child_added', (snapshot) => {
      let message = snapshot.val();
      message.key = snapshot.key;

      message.map = "https://maps.googleapis.com/maps/api/staticmap?center" +
        message.lat + ", " + message.lng +
        "&zoom=15&size=400x400" + "&markers=color:red%7Clabel:S%7C" +
        message.lat + ", " + message.lng +
        "&maptype=roadmap&key=AIzaSyCuODQHd7Gi_JKpLPyx_2bJrvRFHbgPUKM";

      successCalback(message);
    });
  }

  setMessageRead(message) {
    let updates = {};

    //Criamos uma Key para o objeto de configuração do update
    updates[`/messages/${this.user.id}/${message.key}/read`] = true;

    return this.firebase.database().ref().update(updates);
  }

}
