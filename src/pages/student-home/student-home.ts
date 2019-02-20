import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/User';
import { Lesson } from '../../models/Lesson';
import { LessonProvider } from '../../providers/lesson/lesson';
import { CourseProvider } from '../../providers/course/course';
import { DegreeCourse } from '../../models/DegreeCourse';
import { LoginProvider } from '../../providers/login/login';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { DatePipe } from '@angular/common';
import { Term } from '../../models/Term';
import { TermProvider } from '../../providers/term/term';
import { LessonPage } from '../lesson/lesson';
import { StudentProvider } from '../../providers/student/student';
import { DomSanitizer } from '@angular/platform-browser';
import { ExamEnrollment } from '../../models/ExamEnrollment';
import { ExamProvider } from '../../providers/exam/exam';
import { Exam } from '../../models/Exam';
import { FileProvider } from '../../providers/file/file';
import { FileLesson } from '../../models/FileLesson';
import { RecordBookPage } from '../record-book/record-book';
import { UserDetailPage } from '../user-detail/user-detail';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File as Fil } from '@ionic-native/file';  
import { GlobalProvider } from '../../providers/global/global';
import { LessonDetailPage } from '../lesson-detail/lesson-detail';
import { FileOpener } from '@ionic-native/file-opener';
import { LoginPage } from '../login/login';
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
  degreeCourse: DegreeCourse;
  enrollment: StudentHasDegreeCourse;
  todayLessons: Lesson[];
  exams: ExamEnrollment[];
  lessonFiles: FileLesson[];
  media: number = 0;
  cfu: number = 0;
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public lessonProvider: LessonProvider,
    public courseProvider: CourseProvider,
    public studentProvider: StudentProvider,
    public examProvider: ExamProvider,
    public fileProvider: FileProvider,
    public _DomSanitizer: DomSanitizer,
    private transfer: FileTransfer,
    public fil: Fil,
    public global: GlobalProvider,
  public modalCtrl: ModalController,
public fileOpener: FileOpener, public events: Events,
private loadingCtrl: LoadingController) {
        this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
        this.events.subscribe('user:unauth', msg => {
          this.navCtrl.push(LoginPage)
        })
        
       this.studentProvider.getStudentCourse(this.user.iduser).subscribe(enrollment => {
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
            year: enrollment.degreeCourse.academicYear.year
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
    
       this.lessonProvider.getTodayLessons(this.user.iduser).subscribe(lessons => {
         this.todayLessons = lessons;
       })

       this.examProvider.getRecordBook(this.user.iduser).subscribe(exams => {
        this.exams = exams;
        let i: number = 0;
        for(let e of this.exams) {
          if(e.grade != 0) {
            this.cfu = this.cfu + e.exam.subject.cfu;
            this.media = this.media + e.grade;
            i++
          }
        }
        this.media = this.media/i
      })

      this.fileProvider.getLastFiles(this.user.iduser).subscribe(files => {
        this.lessonFiles = files;
      })
        
  }

  itemSelected(lesson){
    this.navCtrl.push(LessonPage, lesson);

  }

  ionViewDidLoad() {
  }

  showId(n) {
    return ("000000" + n).slice(-6);
  }

  recordbook() {
    this.navCtrl.push(RecordBookPage, {
      exams: this.exams,
      degreeCourse: this.degreeCourse,
      enrollment: this.enrollment,
      cfu: this.cfu,
      media: this.media
    });
  }

  userdetail() {
    this.navCtrl.push(UserDetailPage);
  }

  download(file) {
    this.loading = this.loadingCtrl.create({
      content: 'Scarico...'
  });
    this.loading.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://' + this.global.address + ':8080/SpringApp/file/download/filelesson/' + file.idFile;
      fileTransfer.download(url, this.fil.externalDataDirectory + file.name).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        var data = { file: file };
        var modalPage = this.modalCtrl.create('ModalConfirmPage', data);
        this.loading.dismiss()
        modalPage.present();
        this.fileOpener.open(entry.toURL(), 'application/com.sec.android.app.myfiles')
          .then(() => console.log('File is opened'))
          .catch(e => {
            console.log('Error opening file', e)
            this.fileOpener.open(entry.toURL(), 'application/com.lge.filemanager')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e))});
      }, (error) => {
        this.loading.dismiss()
      });
  }

  showLesson(lesson) {
    this.navCtrl.push(LessonDetailPage, {
      lesson: lesson
    })
  }

  trunk(filename) {
    if(filename[11] == undefined) {
      return filename
    }
    let label: String = filename
    return label.substring(0, 10) + '...'
  }


  }
