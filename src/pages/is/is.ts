import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EverythingProvider} from "../../providers/everything/everything";

import { Observable } from "rxjs/Observable";
import {DetailsPage} from "../details/details";



@IonicPage()
@Component({
  selector: 'page-is',
  templateUrl: 'is.html',
})
export class IsPage{

  things: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public evr: EverythingProvider,
              public alertCtrl: AlertController,) {
  this.evr.getStuff().subscribe(data => {
    this.things = data;
  },
    err => {
    let problemAlert = this.alertCtrl.create({
      title: "Uh oh",
      message: "this " + err.message + " Seems to be wrong",
      buttons: ["Ok"]
    });
      problemAlert.present();
    });
  }

  goToDetails(thing: Observable<any>){
    this.navCtrl.push(DetailsPage, {
      thing: thing
    })
  }



}
