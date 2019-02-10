import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';
import { Lesson } from '../../models/Lesson';
import { DatePipe } from '@angular/common';
import { ClassPage } from '../class/class';

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  lesson: Lesson;
  start: any;
  end: any;
  datePipe = new DatePipe('en-US');

  constructor(public navCtrl: NavController, public navParams: NavParams, public lessonProvider: LessonProvider) {
    this.lessonProvider.getById(navParams.data).subscribe(lesson=>{
      this.lesson = lesson;
      console.log(this.lesson);
      this.start = this.datePipe.transform(this.lesson.start, 'hh:mm');
      this.end = this.datePipe.transform(this.lesson.end, 'hh:mm');
    })
  }

  showClass(classroom){
    this.navCtrl.push(ClassPage, classroom);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }


}
