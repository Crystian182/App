import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {

  getAllLessonsByCourseAndTermUrl : string = 'http://localhost:8080/SpringApp/lesson/getAllLessonsByCourseAndTerm';


  constructor(public http: HttpClient) {
    console.log('Hello LessonProvider Provider');
  }

  getAllLessonsByCourseAndTerm(idcourse: number, idterm: number): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.getAllLessonsByCourseAndTermUrl + '/idcourse=' + idcourse + '&idterm=' + idterm);
  }

}
