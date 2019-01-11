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

import { HttpClientModule } from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';
import { LoginProvider } from '../providers/login/login';
import { StudentHomePage } from '../pages/student-home/student-home';
import { LessonProvider } from '../providers/lesson/lesson';
import { CourseProvider } from '../providers/course/course';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    FirstPage,
    RegisterPage,
    LoggedinPage,
    StudentHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    FirstPage,
    RegisterPage,
    LoggedinPage,
    StudentHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    LoginProvider,
    LessonProvider,
    CourseProvider
  ]
})
export class AppModule {}
