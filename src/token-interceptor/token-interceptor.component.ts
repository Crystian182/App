import { Injectable, ViewChild } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http ,HttpModule} from '@angular/http'
import { map, tap } from 'rxjs/operators';
import { Nav, Platform, NavController, Events } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  @ViewChild(Nav) nav: Nav;

  constructor(public events: Events) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    if(request.url!='http://192.168.1.11:8080/SpringApp/public/login' && request.url!='http://192.168.1.11:8080/SpringApp/refreshtoken') {
      /*this.loginService.refreshToken().subscribe(token => {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.user.token = JSON.stringify({ token: token })
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log(localStorage.getItem('currentUser'))
      });*/

      if(JSON.parse(window.localStorage['currentUser'] || '[]') == null) {
        window.localStorage['currentUser'] = null;
            this.events.publish('user:unauth', 'NON AUTORIZZATO');
      } else {

      
      request = request.clone({
        setHeaders: {
          'X-Auth': `${JSON.parse(window.localStorage['currentUser'] || '[]').token}`
        }
      });}
    } 
    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            window.localStorage['currentUser'] = null;
            this.events.publish('user:unauth', 'NON AUTORIZZATO');
          }
        }
    }
    ));
    
    
  }

}