import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ModalController } from 'ionic-angular';
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
import { Ticket } from '../../models/Ticket';
import { TicketProvider } from '../../providers/ticket/ticket';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { LoginPage } from '../login/login';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the TeacherHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html',
})
export class TeacherHomePage {
  user: User;
  degreeCourse: DegreeCourse;
  enrollment: StudentHasDegreeCourse;
  todayLessons: Lesson[];
  lessonFiles: FileLesson[];
  tickets: Ticket[] = [];
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public lessonProvider: LessonProvider,
    public courseProvider: CourseProvider,
    public studentProvider: StudentProvider,
    public examProvider: ExamProvider,
    public fileProvider: FileProvider,
    public ticketProvider: TicketProvider,
    public _DomSanitizer: DomSanitizer,
    private transfer: FileTransfer,
    public fil: Fil,
    public global: GlobalProvider, public events: Events, public fileOpener: FileOpener,
    private loadingCtrl: LoadingController,  public modalCtrl: ModalController) {
        this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
        
        this.events.subscribe('user:unauth', msg => {
          this.navCtrl.push(LoginPage)
        })
       this.lessonProvider.getTodayLessons(this.user.iduser).subscribe(lessons => {
         this.todayLessons = lessons;
       })

       this.ticketProvider.getAllTicketsByTeacher(this.user.iduser).subscribe(tickets => {
         this.tickets = tickets
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

  showTicket(ticket) {
    this.navCtrl.push(TicketDetailPage, {
      ticket: ticket
    })
  }

  trunk(title) {
    if(title[19] == undefined) {
      return title
    }
    let label: String = title
    return label.substring(0, 20) + '...'
  }

  trunk2(filename) {
    if(filename[11] == undefined) {
      return filename
    }
    let label: String = filename
    return label.substring(0, 10) + '...'
  }

  }
