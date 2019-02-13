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
  getAllAvailableByStudentUrl : string = 'http://' + this.global.address + ':8080/SpringApp/exam/getAllAvailableByStudent';
  bookStudentUrl : string = 'http://' + this.global.address + ':8080/SpringApp/exam/bookStudent';
  getAllStudentEnrollmentUrl : string = 'http://' + this.global.address + ':8080/SpringApp/exam/getAllEnrollments';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello ExamProvider Provider');
  }

  getRecordBook(idstudent: number): Observable<ExamEnrollment[]>{
    return this.http.get<ExamEnrollment[]>(this.getRecordBookUrl + '/' + idstudent);
  }

  getAllAvailableByStudent(idstudent: number): Observable<Exam[]>{
    return this.http.get<Exam[]>(this.getAllAvailableByStudentUrl + '/' + idstudent);
  }

  bookStudent(idstudent: number, idexam: number): Observable<String>{
    return this.http.get<String>(this.bookStudentUrl + '/idstudent=' + idstudent + '&idexam=' + idexam);
  }

  getAllStudentEnrollment(idstudent: number): Observable<ExamEnrollment[]>{
    return this.http.get<ExamEnrollment[]>(this.getAllStudentEnrollmentUrl + '/' + idstudent);
  }

}
