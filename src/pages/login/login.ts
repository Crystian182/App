import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
//import { AngularFireAuth } from "angularfire2/auth";
import { LoggedinPage } from "../loggedin/loggedin";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {
    console.log(this.uname.value, this.password.value);

    /*this.fireAuth.auth.signInWithEmailAndPassword(this.uname.value, this.password.value)
      .then(data => {
        console.log(data);

        this.navCtrl.push(LoggedinPage, {
          param: data.user.email
        });

        this.showAlert('Successful logged in!')
      })
      .catch(err => {
        console.log(err.message);
        this.showAlert(err.message);
      });*/
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Login!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
