import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ExamEnrollment } from '../../models/ExamEnrollment';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { DegreeCourse } from '../../models/DegreeCourse';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RecordBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-record-book',
  templateUrl: 'record-book.html',
})
export class RecordBookPage {
  exams: ExamEnrollment[];
  degreeCourse: DegreeCourse;
  enrollment: StudentHasDegreeCourse;
  media: number;
  cfu: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.exams = this.navParams.get('exams');
    this.degreeCourse = this.navParams.get('degreeCourse');
    this.enrollment = this.navParams.get('enrollment');
    this.media = this.navParams.get('media');
    this.cfu = this.navParams.get('cfu');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    console.log(this.exams)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordBookPage');
  }

}
