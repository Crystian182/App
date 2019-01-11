import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { TeacherHomePage } from '../pages/teacher-home/teacher-home';
import { StudentHomePage } from '../pages/student-home/student-home';
import { User } from '../models/User';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  user: User;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
      public events: Events) {
    this.initializeApp();
    events.subscribe('user:loggedin', (user) => {
      this.user = user;
      console.log("rilevato")
      console.log(this.user)
    });
    if(JSON.parse(window.localStorage['currentUser'] || '[]') != null){
      console.log('ueeeeeeeee')
      this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
      if(JSON.parse(window.localStorage['currentUser'] || '[]').type == 'student') {
        this.rootPage = StudentHomePage;
      } else {
        this.rootPage = TeacherHomePage;
      }
    } else {
      console.log("vado su login")
      this.rootPage = LoginPage;
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: LoginPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    window.localStorage['currentUser'] = null; 
    this.nav.setRoot(LoginPage);
  }
}
