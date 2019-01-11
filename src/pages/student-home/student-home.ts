import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { CourseProvider } from '../../providers/course/course';
import { DegreeCourse } from '../../models/DegreeCourse';

/**
 * Generated class for the StudentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {
  user: User;
  lessons: Lesson[];
  courses: DegreeCourse[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider, 
    public lessonProvider: LessonProvider,
    public courseProvider: CourseProvider) {
        this.user = this.navParams.get('user');
        console.log(this.user.token);

        this.lessonProvider.getAllLessonsByCourseAndTerm(1,1).subscribe(lessons=>{
          this.lessons = lessons;
          console.log(this.lessons)
        });

        this.courseProvider.getAll().subscribe(courses=>{
          this.courses= courses;
          console.log(this.courses)
        })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentHomePage');
    }
  }
