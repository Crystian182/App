import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';

/**
 * Generated class for the TeacherHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html',
})
export class TeacherHomePage {
  user: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider) {
        this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
  }

  ionViewDidLoad() {
    
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    console.log(this.user);
  }

}
