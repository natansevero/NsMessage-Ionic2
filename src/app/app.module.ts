import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MessageMapPage } from '../pages/message-map/message-map';
import { MessageRoutePage } from '../pages/message-route/message-route';
import { MessageViewPage } from '../pages/message-view/message-view';
import { FriendsPage } from '../pages/friends/friends';
import { MessageNewPage } from '../pages/message-new/message-new';
import { MessageReadPage } from '../pages/message-read/message-read';

import { Fire } from '../util/fire';
import { Messages } from '../util/messages';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FriendsPage,
    MessageMapPage,
    MessageRoutePage,
    MessageViewPage,
    MessageNewPage,
    MessageReadPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FriendsPage,
    MessageMapPage,
    MessageRoutePage,
    MessageViewPage,
    MessageNewPage,
    MessageReadPage
  ],
  providers: [Fire, Messages]
})
export class AppModule {}
