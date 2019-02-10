import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {

  getAllLessonsByCourseAndTermUrl : string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getAllLessonsByCourseAndTerm';
  getLessonByIdUrl: string = 'http://' + this.global.address + ':8080/SpringApp/lesson/getById';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello LessonProvider Provider');
  }

  getAllLessonsByCourseAndTerm(idcourse: number, idterm: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllLessonsByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

  getById(idlesson: number): Observable<Lesson>{
    return this.http.get<Lesson>(this.getLessonByIdUrl + '/' + idlesson);
  }

  
}
