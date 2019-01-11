import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  loginUrl: string = 'http://localhost:8080/SpringApp/public/login';

  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.loginUrl}`, { email: email, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            //if (user && user.token) {
              if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                window.localStorage['currentUser'] = JSON.stringify(user);
              }
            return user;
        }));
      }

}
