import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { FirstPage } from "../pages/first/first";
import { RegisterPage } from "../pages/register/register";
import { LoggedinPage } from "../pages/loggedin/loggedin";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';
import { LoginProvider } from '../providers/login/login';
import { StudentHomePage } from '../pages/student-home/student-home';
import { TeacherHomePage } from '../pages/teacher-home/teacher-home';
import { TokenInterceptor } from '../token-interceptor/token-interceptor.component';
import { LessonProvider } from '../providers/lesson/lesson';
import { CourseProvider } from '../providers/course/course';
import { ChatProvider } from '../providers/chat/chat';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { ChatPage } from '../pages/chat/chat';
import { ContactsPage } from '../pages/contacts/contacts';
import { DetailsPage } from '../pages/details/details';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Push } from '@ionic-native/push';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RelativeTime } from '../pipes/relative-time';
import { GlobalProvider } from '../providers/global/global';
import { UserProvider } from '../providers/user/user';
import { TermProvider } from '../providers/term/term';
import { LessonPage } from '../pages/lesson/lesson';
import { ClassProvider } from '../providers/class/class';
import { ClassPage } from '../pages/class/class';

import { StudentProvider } from '../providers/student/student';
import { ExamProvider } from '../providers/exam/exam';
import { FileProvider } from '../providers/file/file';
import { Transfer } from '@ionic-native/transfer';
import { RecordBookPage } from '../pages/record-book/record-book';
import { UserDetailPage } from '../pages/user-detail/user-detail';

const firebase = {
  apiKey: "AIzaSyAPiAUwJjy0dkG86E1ChL7r1SzgnmycyVM",
    authDomain: "uniapp-86a68.firebaseapp.com",
    databaseURL: "https://uniapp-86a68.firebaseio.com",
    projectId: "uniapp-86a68",
    storageBucket: "uniapp-86a68.appspot.com",
    messagingSenderId: "901075046844"
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    FirstPage,
    RegisterPage,
    LoggedinPage,
    StudentHomePage,
    TeacherHomePage,
    ChatChannelPage,
    ChatPage,
    ContactsPage,
    DetailsPage,
    RelativeTime,
    LessonPage,
    ClassPage,
    RecordBookPage,
    UserDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
      tabsLayout:'icon-left',
      preloadModules: true
    }),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    FirstPage,
    RegisterPage,
    LoggedinPage,
    StudentHomePage,
    TeacherHomePage,
    ChatChannelPage,
    ChatPage,
    ContactsPage,
    DetailsPage,
    LessonPage,
    ClassPage,
    RecordBookPage,
    UserDetailPage
  ],
  providers: [
    Push,
    Firebase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    LoginProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LessonProvider,
    CourseProvider,
    ChatProvider,
    EmojiProvider,
    GlobalProvider,
    Transfer,
    //FcmProvider
    UserProvider,
    TermProvider,
    ClassProvider,
    StudentProvider,
    ExamProvider,
    FileProvider
  ]
})
export class AppModule {}
