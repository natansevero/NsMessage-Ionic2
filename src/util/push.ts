export class Push {

  //Iniciar a nossa push notification
  static init() {
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
    .startInit("dea7ddf3-ca76-4272-9d30-4a73841b097e", "834531657327")
  	.handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  }

  //Retornar o Player ID de cada user
  static getPushId(successCalback) {
    window["plugins"].OneSignal.getIds(ids => {
      successCalback(ids.userId);
    });
  }

  static send(sender, destination, successCallback, errorCallback) {
    let notification = {
      contents: {
        en: `Seu amigo ${sender.name} deixou uam mensagem para você`
      },
      include_player_ids: [destination.pushId]
    }

    window["plugins"].OneSignal.postNotification(notification, (response) => {
      successCallback();
    }, (error) => {
      errorCallback(error);
    })
  }
}
