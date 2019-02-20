import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ExamProvider } from '../../providers/exam/exam';
import { Exam } from '../../models/Exam';
import { User } from '../../models/User';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {
  user:User;
  availableExams: Exam[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public examProvider: ExamProvider, public alertCtrl: AlertController, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    this.examProvider.getAllAvailableByStudent(this.user.iduser).subscribe(exams => {
      this.availableExams = exams;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
  }
  
  bookExam(exam) {
    let alert = this.alertCtrl.create({
      title: 'Conferma iscrizione',
      message: 'Vuoi prenotarti a ' + exam.subject.name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confermo',
          handler: () => {
            this.examProvider.bookStudent(this.user.iduser, exam.idexam).subscribe(res => {
              let alert = this.alertCtrl.create({
                title: 'Conferma',
                message: 'Prenotazione effettuata!',
                buttons: ['Ok']
              })
              alert.present();
              this.examProvider.getAllAvailableByStudent(this.user.iduser).subscribe(exams => {
                this.availableExams = []
                this.availableExams = exams;
              })
            },
          err => {
            let alert = this.alertCtrl.create({
              title: 'Errore',
              message: 'Prenotazione non confermata.',
              buttons: ['Ok']
            })
            alert.present();
          })
          }
        }
      ]
    });
    alert.present();
  }
}
