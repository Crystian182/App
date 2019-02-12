import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { Scheduler } from '../../models/scheduler';
import { DegreeCourse } from '../../models/DegreeCourse';
import { TypeLesson } from '../../models/TypeLesson';

/*
  Generated class for the SchedulerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchedulerProvider {

  getSchedulerUrl: string = 'http://' + this.global.address + ':8080/SpringApp/scheduler/getScheduler';


  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello SchedulerProvider Provider');
  }

  getScheduler(id: any, degreeCourse: DegreeCourse): Observable<any>{
    return this.http.post(this.getSchedulerUrl + '/' + id, degreeCourse);
  }

}
