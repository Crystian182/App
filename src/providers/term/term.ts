import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Term } from '../../models/Term';

/*
  Generated class for the TermProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TermProvider {

  getTermByAcademicYearUrl: string = 'http://localhost:8080/SpringApp/academicyear/getTermsByAaId';

  constructor(public http: HttpClient) {
    console.log('Hello TermProvider Provider');
  }

  getTermByAcademicYearId(id: number): Observable<Term[]>{
    return this.http.get<Term[]>(this.getTermByAcademicYearUrl + '/' + id);
  }

}
