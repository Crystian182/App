import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";*/

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createUser() {
    console.log('Register with: ' + this.uname.value + ' ' + this.password.value);

    /*this.fireAuth.auth.createUserWithEmailAndPassword(this.uname.value, this.password.value)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      })*/

  }
}
