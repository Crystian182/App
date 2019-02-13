import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../models/User';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { Feedback } from '../../models/Feedback';
import { FileProvider } from '../../providers/file/file';
import { File } from '../../models/File';
import { ModalController } from 'ionic-angular';
import { FileDetailPage } from '../file-detail/file-detail';


/**
 * Generated class for the LessonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {
  user: User;
  lesson: Lesson;
  feedbacks: Feedback[] = [];
  files: File[] = [];
  stars: String = '-';
  posted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public lessonProvider: LessonProvider, public fileProvider: FileProvider,
  public modalCtrl : ModalController, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.lesson = this.navParams.get('lesson');
    console.log(this.lesson)
    this.lessonProvider.getFeedback(this.lesson.idlesson).subscribe(feeds => {
      this.feedbacks = feeds
      let i: number = 0
      let starz: number = 0
      for(let f of this.feedbacks) {
        starz = starz + f.stars
        i++
      }
      if(starz != 0) {
        this.stars = (starz/i).toFixed(1);
      }
      
      console.log(this.feedbacks)
    })
    this.fileProvider.getLessonFiles(this.lesson.idlesson).subscribe(files => {
      this.files = files
      console.log(this.files)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonDetailPage');
  }

  canPostFeedbackLesson() {
    let index = this.feedbacks.findIndex(item => item.user.iduser == this.user.iduser);
      if(index == -1) {
        if(this.lesson.start >= new Date()) {
          return false;
        }
        return true;
      } else {
        return false;
      }
  }

  addFeed() {
    var data = { lesson: this.lesson };
    var modalPage = this.modalCtrl.create('ModalFeedbackPage',data);
    modalPage.present();
    this.events.subscribe('feedlesson:added', (feed) => {
      this.feedbacks.push(feed)
      this.posted = true;
      if(this.feedbacks.length == 0) {
        let starz: number = (Number(this.stars) + feed.stars)
        this.stars = (starz).toFixed(1);
      } else {
        let starz: number = (Number(this.stars) + feed.stars)/2
        this.stars = (starz).toFixed(1);
      }
      
    });
  }

  showFile(file) {
    console.log(file)
   this.navCtrl.push(FileDetailPage,{
  file: file,
idlesson: this.lesson.idlesson})
  }

  trunk(filename) {
    let label: String = filename
    return label.substring(0, 20) + '...'
  }



}
