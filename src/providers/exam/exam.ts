import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { Exam } from '../../models/Exam';
import { ExamEnrollment } from '../../models/ExamEnrollment';

/*
  Generated class for the ExamProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamProvider {

  getRecordBookUrl : string = 'http://' + this.global.address + ':8080/SpringApp/exam/getRecordBook';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello ExamProvider Provider');
  }

  getRecordBook(idstudent: number): Observable<ExamEnrollment[]>{
    return this.http.get<ExamEnrollment[]>(this.getRecordBookUrl + '/' + idstudent);
  }


}
