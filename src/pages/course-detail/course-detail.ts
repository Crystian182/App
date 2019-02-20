import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../models/User';
import { SubjectStudy } from '../../models/SubjectStudy';
import { SubjectProvider } from '../../providers/subject/subject';
import { FileLesson } from '../../models/FileLesson';
import { FileDetailPage } from '../file-detail/file-detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CourseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {
  user:User;
  subject: SubjectStudy
  files: FileLesson[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public subjectProvider: SubjectProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.subject = this.navParams.get('subject');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    this.subjectProvider.getSubjectFiles(this.subject.id).subscribe(files => {
      this.files = files;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
  }

  showFile(file) {
   this.navCtrl.push(FileDetailPage,{
  file: file.file
  })
  }

  trunk(filename) {
    if(filename[19] == undefined) {
      return filename
    }
    let label: String = filename
    return label.substring(0, 20) + '...'
  }
}
