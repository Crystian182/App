import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { StudentHomePage } from '../student-home/student-home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController, public loginProvider: LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() {
    this.loginProvider.login(this.email.value, this.password.value).subscribe(data => {
      console.log(data.type)
      this.navCtrl.push(StudentHomePage, {
          user: data
        });
    }, error => {
        this.showAlert('Utente non esistente')
    });
      

       

        
      /*.catch(err => {
        console.log(err.message);
        this.showAlert(err.message);
      });
    /*this.fireAuth.auth.signInWithEmailAndPassword(this.uname.value, this.password.value)
      .then(data => {
        console.log(data);

        this.navCtrl.push(LoggedinPage, {
          param: data.user.email
        });

        this.showAlert('Successful logged in!')
      })
      .catch(err => {
        console.log(err.message);
        this.showAlert(err.message);
      });*/
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
