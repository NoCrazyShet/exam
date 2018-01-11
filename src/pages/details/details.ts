import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EverythingProvider} from "../../providers/everything/everything";
import {things} from "../../models/stuff";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import * as firebase from "firebase";
import UpdateData = firebase.firestore.UpdateData;
import {UpdatePage} from "../update/update";


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

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

  deleteThing(key: string) {
    this.evr.deleteStuff(key).then(() => {

    let alert = this.alertCtrl.create({
      title: "Your thing has been deleted",
      subTitle: "Yep, definately gone",
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

  goToUpdate(thing: Observable<any>){
    this.navCtrl.push(UpdatePage, {
      thing: thing
    })
  }


}
