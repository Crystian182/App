import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { Ticket } from '../../models/Ticket';
import { TicketMessage } from '../../models/TicketMessage';

/*
  Generated class for the TicketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketProvider {

  getTicketByTeacherUrl: string = 'http://' + this.global.address + ':8080/SpringApp/ticket/getAllTeacherTickets';
  saveMessageUrl: string = 'http://' + this.global.address + ':8080/SpringApp/ticket/savemessage';
  getTicketByClassroomUrl: string = 'http://' + this.global.address + ':8080/SpringApp/ticket/getAllClassroomTickets';

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello TicketProvider Provider');
  }

  getAllTicketsByTeacher(idteacher: number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.getTicketByTeacherUrl + '/' + idteacher);
  }

  saveMessage(message: TicketMessage): Observable<TicketMessage>{
    return this.http.post<TicketMessage>(this.saveMessageUrl, message);
  }

  getAllTicketsByClassroom(idclassroom: number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.getTicketByClassroomUrl + '/' + idclassroom);
  }
}
