import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DegreeCourse } from '../../models/DegreeCourse';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const headers = new HttpHeaders({'Content-Type' : 'application/json'});


@Injectable()
export class CourseProvider {


  getAllUrl: string = 'http://' + this.global.address + ':8080/SpringApp/course/getAll';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello CourseProvider Provider');
  }

  getAll(): Observable<DegreeCourse[]>{
    return this.http.get<DegreeCourse[]>(this.getAllUrl);
  }

}
