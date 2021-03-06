import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { TeacherHomePage } from '../pages/teacher-home/teacher-home';
import { StudentHomePage } from '../pages/student-home/student-home';
import { User } from '../models/User';
import { Events } from 'ionic-angular';
import { ChatPage } from '../pages/chat/chat';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginProvider } from '../providers/login/login';
import { DetailsPage } from '../pages/details/details';
import { Firebase } from '@ionic-native/firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ToastController } from 'ionic-angular';

import { PreviewChat } from '../models/PreviewChat';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { CalendarPage } from '../pages/calendar/calendar';
import { LessonPage } from '../pages/lesson/lesson';
import { ExamPage } from '../pages/exam/exam';
import { BachecaEsamiPage } from '../pages/bacheca-esami/bacheca-esami';
import { RecordBookPage } from '../pages/record-book/record-book';
import { CoursesPage } from '../pages/courses/courses';
import { TicketDetailPage } from '../pages/ticket-detail/ticket-detail';
import { TicketPage } from '../pages/ticket/ticket';
import { DepartmentPage } from '../pages/department/department';
import { TeacherCalendarPage } from '../pages/teacher-calendar/teacher-calendar';
import { TeacherLessonPage } from '../pages/teacher-lesson/teacher-lesson';
import { LessonDetailPage } from '../pages/lesson-detail/lesson-detail';
import { LessonProvider } from '../providers/lesson/lesson';
import { TicketProvider } from '../providers/ticket/ticket';
import { App } from 'ionic-angular';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

export class NotificationModel {
	public body: string;
	public title: string;
	public tap: boolean
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  user: User;
  chat: PreviewChat

  appMenuItems: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
      public events: Events,public _DomSanitizer: DomSanitizer, public loginService: LoginProvider, public lessonProvider: LessonProvider,
      public ticketProvider: TicketProvider, public alertCtrl: AlertController, public firebase: Firebase, public push: Push, public toastCtrl: ToastController) {
    this.initializeApp();
    
    
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      
      this.events.subscribe('user:loggedin', (user) => {
        this.user = user;
      });
      this.loginService.isTokenValid().subscribe(res => {
        if(res == false) {
          this.rootPage = LoginPage;
        } else {
          if(JSON.parse(window.localStorage['currentUser'] || '[]') != null){
            this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
            if(JSON.parse(window.localStorage['currentUser'] || '[]').type == 'student') {
              console.log('rootstudent')
              console.log(this.nav.getActive())
              this.rootPage = StudentHomePage;
            } else {
              this.rootPage = TeacherHomePage;
            }
          } else {
            this.rootPage = LoginPage;
          }
        }
      

      if(JSON.parse(window.localStorage['currentUser'] || '[]') != null) {
        if(JSON.parse(window.localStorage['currentUser'] || '[]').type == 'student') {
          this.appMenuItems = [
            {title: 'Home', component: StudentHomePage, icon: 'home'},
            {title: 'Chat', component: ChatPage, icon: 'chatbubbles'},
            {title: 'Calendario Lezioni', component: CalendarPage, icon: 'calendar'},
            {title: 'Lezioni', component: LessonPage, icon: 'clipboard'},
            {title: 'Esami', component: ExamPage, icon: 'folder'},
            {title: 'Bacheca prenotazioni', component: BachecaEsamiPage, icon: 'search'},
            {title: 'Corsi', component: CoursesPage, icon: 'book'},
            {title: 'Dipartimento', component: DepartmentPage, icon: 'briefcase'}
          ];
        } else {
          this.appMenuItems = [
            {title: 'Home', component: TeacherHomePage, icon: 'home'},
            {title: 'Chat', component: ChatPage, icon: 'chatbubbles'},
            {title: 'Segnalazioni', component: TicketPage, icon: 'warning'},
            {title: 'Calendario Lezioni', component: TeacherCalendarPage, icon: 'calendar'},
            {title: 'Lezioni', component: TeacherLessonPage, icon: 'clipboard'},
            {title: 'Corsi', component: CoursesPage, icon: 'book'},
            {title: 'Dipartimento', component: DepartmentPage, icon: 'briefcase'}
          ];
        }
      }

      this.events.subscribe('user:loggedin', user => {
        if(user.type == 'student') {
          this.appMenuItems = [
            {title: 'Home', component: StudentHomePage, icon: 'home'},
            {title: 'Chat', component: ChatPage, icon: 'chatbubbles'},
            {title: 'Calendario Lezioni', component: CalendarPage, icon: 'calendar'},
            {title: 'Lezioni', component: LessonPage, icon: 'clipboard'},
            {title: 'Esami', component: ExamPage, icon: 'folder'},
            {title: 'Bacheca prenotazioni', component: BachecaEsamiPage, icon: 'search'},
            {title: 'Corsi', component: CoursesPage, icon: 'book'},
            {title: 'Dipartimento', component: DepartmentPage, icon: 'briefcase'}
          ];
        } else {
          this.appMenuItems = [
            {title: 'Home', component: TeacherHomePage, icon: 'home'},
            {title: 'Chat', component: ChatPage, icon: 'chatbubbles'},
            {title: 'Segnalazioni', component: TicketPage, icon: 'warning'},
            {title: 'Calendario Lezioni', component: TeacherCalendarPage, icon: 'calendar'},
            {title: 'Lezioni', component: TeacherLessonPage, icon: 'clipboard'},
            {title: 'Corsi', component: CoursesPage, icon: 'book'},
            {title: 'Dipartimento', component: DepartmentPage, icon: 'briefcase'}
          ];
        }
      }
    )
      

      if (this.platform.is('cordova')) {
				// Initialize push notification feature
				this.platform.is('android') ? this.initializeFireBaseAndroid() : this.initializeFireBaseIos();
			} else {
				console.log('Push notifications are not enabled since this is not a real device');
			}
  })
})
}

private initializeFireBaseAndroid(): Promise<any> {
  return this.firebase.getToken()
    .catch(error => console.error('Error getting token', error))
    .then(token => {


      Promise.all([
        this.firebase.subscribe('firebase-app'), 	// Subscribe to the entire app
        this.firebase.subscribe('android'),			// Subscribe to android users topic
        //this.firebase.subscribe('userid-1') 		// Subscribe using the user id (hardcoded in this example)
      ]).then((result) => {

        this.subscribeToPushNotificationEvents();
        this.initPushNotification();
      });
    });
}

private initializeFireBaseIos(): Promise<any> {
  return this.firebase.grantPermission()
    .catch(error => console.error('Error getting permission', error))
    .then(() => {
      this.firebase.getToken()
        .catch(error => console.error('Error getting token', error))
        .then(token => {

          Promise.all([
            this.firebase.subscribe('firebase-app'),
            this.firebase.subscribe('ios'),
            //this.firebase.subscribe('userid-2')
          ]).then((result) => {

            this.subscribeToPushNotificationEvents();
          });
        });
    })

}

private saveToken(token: any): Promise<any> {
  // Send the token to the server
  return Promise.resolve(true);
}

private subscribeToPushNotificationEvents(): void {

  // Handle token refresh
  this.firebase.onTokenRefresh().subscribe(
    token => {
      this.saveToken(token);
    },
    error => {
      console.error('Error refreshing token', error);
    });

  // Handle incoming notifications
  this.firebase.onNotificationOpen().subscribe(
    (notification: any) => {
      !notification.tap
        ? console.log('The user was using the app when the notification arrived...')
        : console.log('The app was closed when the notification arrived...');
        if(notification.tap) {
        if(notification.type == 'private') {
          /*this.nav.push(ChatChannelPage, {
            chat: {toUser: {iduser: notification.iduser, name: notification.name, surname: notification.surname}}         
          });*/
          this.nav.push(ChatPage);
        } else if(notification.type == 'public'){
          this.nav.push(ChatPage);
        } else if(notification.type == 'feedlesson'){
          this.nav.push(LessonDetailPage, {
            lesson: {idlesson: notification.additionalData}
          });
        }
      } 
    },
    error => {
      console.error('Error getting the notification', error);
    });
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

  logout() {
    window.localStorage['currentUser'] = null; 
    this.nav.setRoot(LoginPage);
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
      console.log('Device registered', registration)
    }
  );

  pushObject.on('notification').subscribe((notification: any) => {
    console.log(notification)
    let toast = this.toastCtrl.create({
      message: notification.title + ": " + notification.message,
      duration: 5000,
      position: 'top',
      dismissOnPageChange: true
    });
    console.log(this.nav.getActive())
    if(notification.additionalData.type=='private' || notification.additionalData.type=='public') {
      
      if(this.nav.getActive().component.name != 'ChatChannelPage') {
        toast.present();
      }
    } else if(notification.additionalData.type == 'lesson'){
      if(notification.additionalData.foreground) {
        toast.present();
      } else {
        this.lessonProvider.getById(notification.additionalData.idlesson).subscribe(lesson => {
          this.nav.push(LessonDetailPage, {
            lesson: lesson
          });
        })
        
      }
    } else if(notification.additionalData.type == 'ticket'){
      if(notification.additionalData.foreground) {
        toast.present();
      } else {
        this.ticketProvider.getById(notification.additionalData.idticket).subscribe(ticket => {
          this.nav.push(TicketDetailPage, {
            ticket: ticket
          });
        })
        
      }
    } 
    
  });
}
  
}
