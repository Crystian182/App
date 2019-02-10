import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from '../../models/Class';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ClassProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClassProvider {

  getByIdUrl: string = 'http://localhost:8080/SpringApp/classroom/getById/';

  constructor(public http: HttpClient) {
    console.log('Hello ClassProvider Provider');
  }

  getClassById(id: number): Observable<Class>{
    return this.http.get<Class>(this.getByIdUrl + id);
  }

}
