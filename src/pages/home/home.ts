import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { things } from "../../models/stuff";
import { EverythingProvider } from "../../providers/everything/everything";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  thing = {} as things;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public evr: EverythingProvider,
              public alertCtrl: AlertController) {
  }

  setThing() {
    let successAlert = this.alertCtrl.create({
      title: "Hurray! It worked!",
      message: 'Your item ' + this.thing.name + ' is now saved',
      buttons: ["Okay!"]
    });
    this.evr.sendStuff(this.thing).then(set => {
        successAlert.present();
        this.thing.name="";
        this.thing.description="";
        this.thing.color="";
    },
      error => {
      successAlert.setMessage(error.message + " Please try again");
      successAlert.setTitle("Something fucked up");
      successAlert.present();
      });
  }

}
