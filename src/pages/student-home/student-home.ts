import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';

/**
 * Generated class for the StudentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {
  user: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider) {
        
  }

  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    console.log(this.user.token)
  }

  

}
