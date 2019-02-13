import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { SubjectStudy } from '../../models/SubjectStudy';
import { FileLesson } from '../../models/FileLesson';


/*
  Generated class for the SubjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectProvider {

  getSubjectByUrl: string = 'http://' + this.global.address + ':8080/SpringApp/subject/getByIdCourse';
  getAllStudentSubjectUrl: string = 'http://' + this.global.address + ':8080/SpringApp/subject/getByIdStudent';
  getSubjectFilesUrl: string = 'http://' + this.global.address + ':8080/SpringApp/file/getSubjectFiles';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello SubjectProvider Provider');
  }

  getSubjectById(id: number): Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getSubjectByUrl + '/' + id);
  }

  getAllStudentSubject(idstudent: number): Observable<SubjectStudy[]>{
    return this.http.get<SubjectStudy[]>(this.getAllStudentSubjectUrl + '/' + idstudent);
  }

  getSubjectFiles(idsubject: number): Observable<FileLesson[]>{
    return this.http.get<FileLesson[]>(this.getSubjectFilesUrl + '/' + idsubject);
  }

}
