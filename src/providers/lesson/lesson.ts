import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { Feedback } from '../../models/Feedback';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {

  getAllLessonsByCourseAndTermUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getAllLessonsByCourseAndTerm';
  getLessonByIdUrl: string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getById';
  getTodayLessonsUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getTodayLessons';
  searchLessonsUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/searchLessons';
  searchTeacherLessonsUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/searchTeacherLessons';
  getFeedbackUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getFeedback';
  saveFeedbackUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/saveFeedback';
  saveFeedbackFileUrl : string = 'http://' + this.global.address + ':8080/SpringApp/file/saveFeedback';
  getFeedbackFileUrl : string = 'http://' + this.global.address + ':8080/SpringApp/file/getFeedbackFile';
  getTeacherTodayLessonsUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getTeacherTodayLessons';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello LessonProvider Provider');
  }

  getAllLessonsByCourseAndTerm(idcourse: number, idterm: any): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllLessonsByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  searchLessons(idcourse: number, idterm: any, idsubject: number, from: String, to: String): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.searchLessonsUrl + '/idcourse=' + idcourse + '&idterm=' + idterm + '&idsubject=' + idsubject + '&from=' + from + '&to=' + to);
  }

  searchTeacherLessons(idsubject: number, from: String, to: String): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.searchTeacherLessonsUrl + '/idsubject=' + idsubject + '&from=' + from + '&to=' + to);
  }

  getById(idlesson: number): Observable<Lesson>{
    return this.http.get<Lesson>(this.getLessonByIdUrl + '/' + idlesson);
  }

  getTodayLessons(iduser: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getTodayLessonsUrl + '/' + iduser);
  }

  getTeacherTodayLessons(iduser: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getTeacherTodayLessonsUrl + '/' + iduser);
  }

  getFeedback(idlesson: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.getFeedbackUrl + '/' + idlesson);
  }

  saveFeed(idlesson: number, feed: Feedback): Observable<String>{
    return this.http.post<String>(this.saveFeedbackUrl + '/' + idlesson, feed);
  }

  saveFeedFile(idfile: number, idlesson: number, feed: Feedback): Observable<String>{
    if(idlesson == undefined) {
      idlesson=0
    }
    return this.http.post<String>(this.saveFeedbackFileUrl + '/idfile=' + idfile + '&idlesson=' + idlesson, feed);
  }

  getFeedbackFile(idfile: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.getFeedbackFileUrl + '/' + idfile);
  }
  
}
