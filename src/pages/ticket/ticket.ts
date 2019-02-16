import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../models/User';
import { Ticket } from '../../models/Ticket';
import { TicketProvider } from '../../providers/ticket/ticket';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

  user:User;
  tickets: Ticket[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public ticketProvider: TicketProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    this.ticketProvider.getAllTicketsByTeacher(this.user.iduser).subscribe(tickets => {
      this.tickets = tickets
      console.log(tickets)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
  }

  showTicket(ticket) {
    this.navCtrl.push(TicketDetailPage, {
      ticket: ticket
    });
  }

  trunk(title) {
    if(title[19] == undefined) {
      return title
    }
    let label: String = title
    return label.substring(0, 20) + '...'
  }

}
