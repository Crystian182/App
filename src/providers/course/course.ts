import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DegreeCourse } from '../../models/DegreeCourse';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable()
export class CourseProvider {


  getAllUrl: string = 'http://localhost:8080/SpringApp/course/getAll';

  constructor(public http: HttpClient) {
    console.log('Hello CourseProvider Provider');
  }

  getAll(): Observable<DegreeCourse[]>{
    return this.http.get<DegreeCourse[]>(this.getAllUrl);
  }

}
