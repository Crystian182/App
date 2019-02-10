import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TeacherHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html',
})
export class TeacherHomePage {
  user: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider, public loginService: LoginProvider) {
      this.user = JSON.parse(window.localStorage['currentUser'] || '[]');

      this.loginService.isTokenValid().subscribe(res => {
      })
    }

  ionViewDidLoad() {
  }

}
