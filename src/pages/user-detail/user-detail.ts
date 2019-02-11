import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/User';
import { DatePipe } from '@angular/common';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {
  user: User;
  dob: String;
  datePipe = new DatePipe('en-US');

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userProvider: UserProvider, public alertCtrl: AlertController) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.dob = this.datePipe.transform(this.user.dateBirth, 'dd/MM/yyyy');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }

  update() {
    this.userProvider.save(this.user).subscribe(user => {
      
      user.token = this.user.token
      console.log(user)
      window.localStorage['currentUser'] = JSON.stringify(user);
      let alert = this.alertCtrl.create({
        title: 'Conferma',
        subTitle: 'Aggiornamento riuscito',
        buttons: ['OK']
      });
      alert.present();
    },
    err => {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'Impossibile aggiornare',
        buttons: ['OK']
      });
      alert.present();
    })
  }

}
