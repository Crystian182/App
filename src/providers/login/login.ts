import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  loginUrl: string = 'http://' + this.global.address + ':8080/SpringApp/public/login';
  tokenCheckUrl: string = 'http://' + this.global.address + ':8080/SpringApp/public/istokenvalid';

  constructor(public http: HttpClient, public global: GlobalProvider) {
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

   isTokenValid(): Observable<boolean> {
      return this.http.get<boolean>(this.tokenCheckUrl);
    }
}
