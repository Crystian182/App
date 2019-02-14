import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { Building } from '../../models/Building';

/*
  Generated class for the BuildingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuildingProvider {

  getAllUrl : string = 'http://' + this.global.address + ':8080/SpringApp/building/getAll';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello BuildingProvider Provider');
  }

  getAll(): Observable<Building[]>{
    return this.http.get<Building[]>(this.getAllUrl);
  }

}
