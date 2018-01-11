import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {things} from "../../models/stuff";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {EverythingProvider} from "../../providers/everything/everything";

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  thingsRef: AngularFireList<any>;
  things: Observable<any[]>;
  thing: things;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public evr: EverythingProvider,
              public alertCtrl: AlertController,
              public afDb: AngularFireDatabase) {
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
    this.thing = this.navParams.get('thing');
    this.thingsRef = afDb.list('/things');
  }

  updateThing(key: string, thing: things) {
    this.evr.updateStuff(key, this.thing).then(() => {
      let alert = this.alertCtrl.create({
        title: "Your thing has been updated",
        subTitle: "It is now a new thing!",
        buttons: ["Okaydokay"]
      });
      alert.present();
    }, error => {
      let problemAlert = this.alertCtrl.create({
        title: "Uh oh",
        message: "this " + error.message + " Seems to be wrong",
        buttons: ["Ok"]
      });
      problemAlert.present();
    }).then(() => this.navCtrl.pop())
    }


}
