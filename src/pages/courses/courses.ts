import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { User } from '../../models/User';
import { SubjectProvider } from '../../providers/subject/subject';
import { SubjectStudy } from '../../models/SubjectStudy';
import { CourseDetailPage } from '../course-detail/course-detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  user:User;
  subjects: SubjectStudy[];
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public subjectProvider: SubjectProvider, public events: Events, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Attendi...'
  });
  this.loading.present();
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
      this.loading.dismiss()
    })
    if(this.user.type == 'student'){
      this.subjectProvider.getAllStudentSubject(this.user.iduser).subscribe(subjects => {
        this.subjects = subjects;
        this.loading.dismiss()
      })
    } else {
      this.subjectProvider.getAllTeacherSubject(this.user.iduser).subscribe(subjects => {
        this.subjects = subjects;
        this.loading.dismiss()
      })
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
  }

  showSubject(subject) {
    this.navCtrl.push(CourseDetailPage, {
      subject: subject
    });
  }

  trunk(title) {
    if(title[13] == undefined) {
      return title;
    }
    let label: String = title
    return label.substring(0, 14) + '...'
  }

}
