import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, } from "angularfire2/database";
import { things } from "../../models/stuff";
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EverythingProvider {

  thingsRef: AngularFireList<any>;
  things: Observable<any[]>;
  thingsGoHere = firebase.database().ref('/things');

  constructor(public afDb: AngularFireDatabase) {

  }

  sendStuff(thing: things): Promise<any>{
    return this.thingsGoHere.push().set({
      name: thing.name,
      description: thing.description,
      color: thing.color
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
    }

    getStuff():Observable<any> {
    this.thingsRef = this.afDb.list('/things');
     try {
       return this.things = this.thingsRef.snapshotChanges().map(changes=> {
      return changes.map(c=> ({key: c.payload.key, ... c.payload.val()}));
    })
      }
      catch (err) {
       console.error(err);
       throw new Error(err);
      }
      finally {
       console.log('Done');
     }

    }

    deleteStuff(key: string): Promise<any> {
    return this.thingsRef.remove(key)
      .catch(error => {
        console.error(error);
        throw new Error(error);
      })
    }

    updateStuff(key: string, thing: things): Promise<any> {
    return this.thingsRef.update(key, {name: thing.name, color: thing.color, description: thing.description})
      .catch(error => {
        console.error(error);
        throw new Error(error);
      })
    }

}
