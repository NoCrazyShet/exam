import {  BrowserModule } from '@angular/platform-browser';
import {  ErrorHandler, NgModule } from '@angular/core';
import {  IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {  SplashScreen } from '@ionic-native/splash-screen';
import {  StatusBar } from '@ionic-native/status-bar';

import {  MyApp } from './app.component';
import {  firebaseConfig  } from "./firebase.config";
import {  AngularFireModule } from "angularfire2";
import {  AngularFireDatabaseModule } from "angularfire2/database";
import { EverythingProvider } from '../providers/everything/everything';
import { AngularFirestoreModule} from "angularfire2/firestore";
import {DetailsPage} from "../pages/details/details";
import {UpdatePage} from "../pages/update/update";


@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    UpdatePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    UpdatePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EverythingProvider,
  ]
})
export class AppModule {}
