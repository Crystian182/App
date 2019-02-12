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
  getFeedbackUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getFeedback';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello LessonProvider Provider');
  }

  getAllLessonsByCourseAndTerm(idcourse: number, idterm: any): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllLessonsByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  searchLessons(idcourse: number, idterm: any, idsubject: number, from: String, to: String): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.searchLessonsUrl + '/idcourse=' + idcourse + '&idterm=' + idterm + '&idsubject=' + idsubject + '&from=' + from + '&to=' + to);
  }

  getById(idlesson: number): Observable<Lesson>{
    return this.http.get<Lesson>(this.getLessonByIdUrl + '/' + idlesson);
  }

  getTodayLessons(iduser: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getTodayLessonsUrl + '/' + iduser);
  }

  getFeedback(idlesson: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.getFeedbackUrl + '/' + idlesson);
  }
  
}
