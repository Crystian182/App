import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  getStudentCourseUrl: string = 'http://localhost:8080/SpringApp/user/getInfoStudent';

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getStudentCourse(id: number): Observable<StudentHasDegreeCourse>{
    return this.http.get<StudentHasDegreeCourse>(this.getStudentCourseUrl + '/' + id);
  }

}
