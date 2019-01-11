import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Lesson } from '../../models/Lesson';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'https://jsonplaceholder.typicode.com/users';


  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }

  getUsersObs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 

}
