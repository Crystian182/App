import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';
import { Lesson } from '../../models/Lesson';
import { Feedback } from '../../models/Feedback';
import { User } from '../../models/User';
import { File } from '../../models/File';

/**
 * Generated class for the ModalFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-feedback',
  templateUrl: 'modal-feedback.html',
})
export class ModalFeedbackPage {
  description: String;
  stars: number;
  error: boolean = false;
  lesson: Lesson;
  user: User;
  file: File;
  idlesson: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,  public events: Events,
    public lessonProvider: LessonProvider) {
      this.lesson = this.navParams.get('lesson');
      this.file = this.navParams.get('file');
      this.idlesson = this.navParams.get('idlesson');
      this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
      events.subscribe('star-rating:changed', (starRating) => {
        console.log(starRating)
        this.stars = starRating
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalFeedbackPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  save() {
    this.error = false;
    if(this.description == undefined || this.stars == undefined) {
      this.error = true;
    } else {
      this.lessonProvider.saveFeed(this.lesson.idlesson, {date: new Date(), description: this.description, stars: this.stars, user: {iduser: this.user.iduser}} as Feedback).subscribe(res => {
        this.events.publish('feedlesson:added', {date: new Date(), description: this.description, stars: this.stars, user: {iduser: this.user.iduser}} as Feedback);
      },
    err => {
    })
      this.viewCtrl.dismiss();
    }
  }

  saveFile() {
    this.error = false;
    if(this.description == undefined || this.stars == undefined) {
      this.error = true;
    } else {
      this.lessonProvider.saveFeedFile(this.file.idFile, this.idlesson, {date: new Date(), description: this.description, stars: this.stars, user: {iduser: this.user.iduser}} as Feedback).subscribe(res => {
        this.events.publish('feedfile:added', {date: new Date(), description: this.description, stars: this.stars, user: {iduser: this.user.iduser}} as Feedback);
      },
    err => {
    })
      this.viewCtrl.dismiss();
    }
  }
}
