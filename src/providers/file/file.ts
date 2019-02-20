import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StudentHasDegreeCourse } from '../../models/StudentHasDegreeCourse';
import { GlobalProvider } from '../global/global';
import { FileLesson } from '../../models/FileLesson';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '../../models/File';

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileProvider {

  getLastFilesUrl: string = 'http://' + this.global.address + ':8080/SpringApp/file/getLastFiles';
  downloadLessonFileUrl: string = 'http://' + this.global.address + ':8080/SpringApp/file/download/filelesson';
  getLessonFilesUrl: string = 'http://' + this.global.address + ':8080/SpringApp/file/getLessonFiles';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello FileProvider Provider');
  }

  getLastFiles(iduser: number): Observable<FileLesson[]>{
    return this.http.get<FileLesson[]>(this.getLastFilesUrl + '/' + iduser);
  }

  downloadLessonFile(idfile: number) {
    //let browser = new InAppBrowser(this.downloadLessonFileUrl + '/' + idfile, '_system');
    //return this.http.get(this.downloadLessonFileUrl + '/' + idfile);
  }

  getLessonFiles(idlesson: number): Observable<File[]>{
    return this.http.get<File[]>(this.getLessonFilesUrl + '/' + idlesson);
  }

}
