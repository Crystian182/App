import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { CourseProvider } from '../../providers/course/course';
import { DegreeCourse } from '../../models/DegreeCourse';
import { LoginProvider } from '../../providers/login/login';
import { UserProvider } from '../../providers/user/user';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { DatePipe } from '@angular/common';
import { Term } from '../../models/Term';
import { TermProvider } from '../../providers/term/term';
import { LessonPage } from '../lesson/lesson';

/**
 * Generated class for the StudentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {
  user: User;
  lessons: Lesson[];
  course: DegreeCourse;
  studentHasCourse: StudentHasDegreeCourse;
  enrollmentdate: any;
  now: any;
  year: any;
  thisterm: any;
  startterm: any;
  endterm: any;
  datePipe = new DatePipe('en-US');
  terms: Term[];
  myterms: Term[];;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public lessonProvider: LessonProvider,
    public courseProvider: CourseProvider,
    public userProvider: UserProvider,
    public termProvider: TermProvider) {
        this.user = this.navParams.get('user');
        this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
        console.log(this.user)


       this.userProvider.getStudentCourse(this.user.iduser).subscribe(studentHasCourse=>{
         this.studentHasCourse = studentHasCourse;
         this.course = studentHasCourse.degreeCourse;
         this.enrollmentdate =  this.datePipe.transform(studentHasCourse.date, 'y');
         this.now = String(new Date().getFullYear());
         this.year = this.now-this.enrollmentdate;
       
         console.log(studentHasCourse, this.course, this.enrollmentdate,this.year);

         this.thisterm = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
         this.terms = studentHasCourse.degreeCourse.academicYear.terms;
         for(let t in this.terms){
          this.startterm =  this.datePipe.transform(studentHasCourse.degreeCourse.academicYear.terms[t].start, 'dd/MM/yyyy');
          this.endterm = this.datePipe.transform(studentHasCourse.degreeCourse.academicYear.terms[t].end, 'dd/MM/yyyy');
          console.log(this.thisterm, this.startterm, this.endterm);
          if(this.startterm < this.thisterm && this.thisterm < this.endterm){
            console.log("sei qui");
            this.termProvider.getTermByAcademicYearId(studentHasCourse.degreeCourse.academicYear.idacademicYear).subscribe(myterms=>{
              this.myterms = myterms.filter(myterms=>this.datePipe.transform(myterms.start, 'dd/MM/yyyy')< this.thisterm && this.datePipe.transform(myterms.end, 'dd/MM/yyyy') > this.thisterm);
              this.lessonProvider.getAllLessonsByCourseAndTerm(this.course.idcourse, this.myterms[0].idterm).subscribe(lessons=>{
                this.lessons = lessons.filter(lessons=>this.datePipe.transform(lessons.start, 'dd/MM/yyyy') === this.thisterm);
                
               })
            })
          }
         }
        

         
       })
    
        
  }

  itemSelected(lesson){
    this.navCtrl.push(LessonPage, lesson);

  }

  ionViewDidLoad() {
  }

  

  }
