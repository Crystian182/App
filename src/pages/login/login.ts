import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { StudentHomePage } from '../student-home/student-home';
import { TeacherHomePage } from '../teacher-home/teacher-home';
import { Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { User } from '../../models/User';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  user: User

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loginProvider: LoginProvider,
              public events: Events,
              public push: Push,
              public fdb: AngularFireDatabase) {
                this.loginProvider.isTokenValid().subscribe(res => {
                  if(JSON.parse(window.localStorage['currentUser'] || '[]') != null && res == true) {
                    if(JSON.parse(window.localStorage['currentUser'] || '[]').type == 'student') {
                      this.navCtrl.push(StudentHomePage);
                    } else {
                      this.navCtrl.push(TeacherHomePage);
                    }
                  } 
                })
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 

  signInUser() {
    this.loginProvider.login(this.email.value, this.password.value).subscribe(data => {
      if(data.type == 'student') {
        this.navCtrl.push(StudentHomePage, {
          user: data
        });
        this.user = data
        this.events.publish('user:loggedin', data);
        this.initPushNotification();
      } else if(data.type == 'teacher') {
        this.navCtrl.push(TeacherHomePage, {
          user: data
        });
        this.user = data
        this.events.publish('user:loggedin', data);
        this.initPushNotification();
      } else {
        window.localStorage['currentUser'] = null;
        this.showAlert('Accesso non autorizzato')
      }
      }, error => {
          this.showAlert('Utente non esistente')
      });
    }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  initPushNotification() {
    const options: PushOptions = {
      android: {
        senderID: '901075046844'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   }
   
   const pushObject: PushObject = this.push.init(options);   
   
  pushObject.on('registration').subscribe((registration: any) => {
      this.fdb.database.ref('/tokens').child(`${this.user.iduser}`).set({token: registration.registrationId});
    }
  );
   
  }

}
