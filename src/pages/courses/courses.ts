import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { SubjectProvider } from '../../providers/subject/subject';
import { SubjectStudy } from '../../models/SubjectStudy';
import { CourseDetailPage } from '../course-detail/course-detail';

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
  public subjectProvider: SubjectProvider) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    if(this.user == 'student'){
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
