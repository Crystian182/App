import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/User';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { Feedback } from '../../models/Feedback';

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
  feedbacks: Feedback[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public lessonProvider: LessonProvider) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.lesson = this.navParams.get('lesson');
    this.lessonProvider.getFeedback(this.lesson.idlesson).subscribe(feeds => {
      this.feedbacks = feeds
      console.log(this.feedbacks)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonDetailPage');
  }

}
