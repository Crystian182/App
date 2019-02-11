import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentProvider {

  getStudentCourseUrl: string = 'http://' + this.global.address + ':8080/SpringApp/user/getInfoStudent';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello StudentProvider Provider');
  }

  getStudentCourse(id: number): Observable<StudentHasDegreeCourse>{
    return this.http.get<StudentHasDegreeCourse>(this.getStudentCourseUrl + '/' + id);
  }

}
