import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
import { LoginPage } from '../login/login';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  events = [];
  valid: boolean = false;
  user: User;
  degreeCourse: DegreeCourse;
  enrollment: StudentHasDegreeCourse;
  selectedTerm: Term;
  terms: Term[] = [];
  typeLessons: TypeLesson[]
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private calendar: Calendar, public studentProvider: StudentProvider,
  public schedulerProvider: SchedulerProvider, private launchNavigator: LaunchNavigator, public eventz: Events) {
      this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
      this.eventz.subscribe('user:unauth', msg => {
        this.navCtrl.push(LoginPage)
      })
      this.studentProvider.getStudentCourse(this.user.iduser).subscribe(enrollment => {
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
        this.enrollment = {
          date: enrollment.date,
          enrollmentStatus: {
            idenrollmentStatus: enrollment.enrollmentStatus.idenrollmentStatus,
            description: enrollment.enrollmentStatus.description
          }
        }
       })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  getScheduler() {
    this.schedulerProvider.getScheduler(this.selectedTerm, this.degreeCourse).subscribe(typelessons => {
      this.typeLessons = typelessons
      this.valid = true;
    })
  }

  hasLessonsToday() {
    for (let t of this.typeLessons) {
      if(t.day.idDay == this.selectedDay.idDay) {
        return true;
      }
    }
    return false;
  }

  shiftDay(n) {
    if( this.selectedDay.idDay == 1 && n == -1) {
      this.selectedDay = this.days[6]
    } else if( this.selectedDay.idDay == 7 && n == 1) {
      this.selectedDay = this.days[0]
    } else {
      this.selectedDay = this.days[this.selectedDay.idDay - 1 + n]
    }
  }

  showClassroom(classroom) {
    this.launchNavigator.navigate([classroom.lat, classroom.lng])
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
}
