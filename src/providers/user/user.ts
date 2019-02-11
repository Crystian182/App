import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { User } from '../../models/User';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  saveUserUrl: string = 'http://' + this.global.address + ':8080/SpringApp/user/save';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello UserProvider Provider');
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.saveUserUrl, user);
  }

}
