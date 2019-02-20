import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { User } from '../../models/User';
import { ExamEnrollment } from '../../models/ExamEnrollment';
import { ExamProvider } from '../../providers/exam/exam';
import { LoginPage } from '../login/login';

/**
 * Generated class for the BachecaEsamiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bacheca-esami',
  templateUrl: 'bacheca-esami.html',
})
export class BachecaEsamiPage {
  user:User;
  enrollments: ExamEnrollment[]
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public examProvider: ExamProvider, public events: Events, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Attendi...'
  });
  this.loading.present();
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
      this.loading.dismiss()
    })
    this.examProvider.getAllStudentEnrollment(this.user.iduser).subscribe(enrollments => {
      this.enrollments = enrollments;
      this.loading.dismiss()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
  }
  
  
}

