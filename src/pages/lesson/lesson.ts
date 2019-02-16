import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { User } from '../../models/User';
import { DegreeCourse } from '../../models/DegreeCourse';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { StudentProvider } from '../../providers/student/student';
import { Term } from '../../models/term';
import { SchedulerProvider } from '../../providers/scheduler/scheduler';
import { Day } from '../../models/day';
import { Scheduler } from '../../models/scheduler';
import { TypeLesson } from '../../models/TypeLesson';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SubjectProvider } from '../../providers/subject/subject';
import { SubjectStudy } from '../../models/SubjectStudy';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { DatePipe } from '@angular/common';
import { LessonDetailPage } from '../lesson-detail/lesson-detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  events = [];
  valid: boolean = false;
  user: User;
  degreeCourse: DegreeCourse;
  subjects: SubjectStudy[]
  selectedSubject: number;
  selectedTerm: number;
  terms: Term[] = [];
  lessons: Lesson[]
  fromDate: Date;
  toDate: Date;
 days: Day[] = [
   {idDay: 1, name: 'Lunedì'},
   {idDay: 2, name: 'Martedì'},
   {idDay: 3, name: 'Mercoledì'},
   {idDay: 4, name: 'Giovedì'},
   {idDay: 5, name: 'Venerdì'},
   {idDay: 6, name: 'Sabato'},
   {idDay: 7, name: 'Domenica'},
 ]
 selectedDay: Day = this.days[0]
 datePipe = new DatePipe('en-US');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private calendar: Calendar, public studentProvider: StudentProvider,
    public schedulerProvider: SchedulerProvider,
    private launchNavigator: LaunchNavigator,
    public subjectProvider: SubjectProvider,
    public lessonProvider: LessonProvider,
    public alertCtrl: AlertController, public eventz: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.eventz.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
      this.studentProvider.getStudentCourse(this.user.iduser).subscribe(enrollment => {
        console.log(enrollment)
        for(let t of enrollment.degreeCourse.academicYear.terms) {
          this.terms.push({
            idterm: t.idterm,
            start: t.start,
            end: t.end
          })
        }
        this.degreeCourse = {
          idcourse: enrollment.degreeCourse.idcourse,
          name: enrollment.degreeCourse.name,
          typeDegreeCourse: {
            idtypeDegreeCourse: enrollment.degreeCourse.typeDegreeCourse.idtypeDegreeCourse,
            name:  enrollment.degreeCourse.typeDegreeCourse.name,
            courseType: {
              idcourseType: enrollment.degreeCourse.typeDegreeCourse.courseType.idcourseType,
              description: enrollment.degreeCourse.typeDegreeCourse.courseType.description,
              duration: enrollment.degreeCourse.typeDegreeCourse.courseType.duration,
              cfu: enrollment.degreeCourse.typeDegreeCourse.courseType.cfu
            }
            
          },
          academicYear: {
            idacademicYear: enrollment.degreeCourse.academicYear.idacademicYear,
            year: enrollment.degreeCourse.academicYear.year,
            terms: this.terms
          }
        }
        this.subjectProvider.getSubjectById(this.degreeCourse.idcourse).subscribe(subjects => {
          this.subjects = subjects
          console.log(this.subjects)
        })
       })

       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  showSubjects() {
    console.log(this.selectedSubject)
    this.valid=false
    if(this.selectedSubject == undefined || this.fromDate == undefined || this.toDate == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'Compila tutti i campi!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.lessonProvider.searchLessons(this.degreeCourse.idcourse, this.selectedTerm, this.selectedSubject, this.datePipe.transform(this.fromDate, 'dd-MM-yyyy'), this.datePipe.transform(this.toDate, 'dd-MM-yyyy')).subscribe(lessons => {

        this.lessons = lessons
        if(this.lessons.length > 0) {
          this.valid = true;
        } else {
          let alert = this.alertCtrl.create({
            title: 'Nessun risultato',
            subTitle: 'Ripetere la ricerca.',
            buttons: ['OK']
          });
          alert.present();
        }
        
      })
      
    }
    
  }

  showClassroom(classroom) {
    this.launchNavigator.navigate([classroom.lat, classroom.lng])
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  showDetail(lesson) {
    this.navCtrl.push(LessonDetailPage, {
      lesson: lesson
    });
  }

}
