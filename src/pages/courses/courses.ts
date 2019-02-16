import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public subjectProvider: SubjectProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    if(this.user.type == 'student'){
      this.subjectProvider.getAllStudentSubject(this.user.iduser).subscribe(subjects => {
        this.subjects = subjects;
        console.log(this.subjects)
      })
    } else {
      this.subjectProvider.getAllTeacherSubject(this.user.iduser).subscribe(subjects => {
        this.subjects = subjects;
        console.log(this.subjects)
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

}
