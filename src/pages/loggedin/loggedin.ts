import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AngularFireAuth } from "angularfire2/auth";
import { RestProvider } from "../../providers/rest/rest";

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {
  email: string;
  users: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider) {

    // this.email = this.fireAuth.auth.currentUser.email;
    this.email = this.navParams.get('param');

    this.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

  getUsers() {
    this.restProvider.getUsers()
      .then(data => {
        console.log(data);
        this.users = data;
      })
      .catch(err => {
        console.log(err.message);
    });
  }

  getUsersObs() {
    this.restProvider.getUsersObs().subscribe(data => {
      console.log(data);
    })
  }

  goToDetail(value) {
    console.log(value);
  }

}
