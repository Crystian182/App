import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Ticket } from '../../models/Ticket';
import { User } from '../../models/User';
import { TicketMessage } from '../../models/TicketMessage';
import { TicketProvider } from '../../providers/ticket/ticket';

/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  ticket: Ticket
  user: User
  addmessage: boolean = false;
  message: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public ticketProvider: TicketProvider) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.ticket = this.navParams.get('ticket');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketDetailPage');
  }

  addMessage() {
    this.addmessage = true;
  }

  sendMessage() {
    if(this.message == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Errore',
        message: 'Compila tutti i campi!',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      this.ticketProvider.saveMessage({
        idticket: this.ticket.id,
          user: {iduser: this.user.iduser, name: this.user.name, surname: this.user.surname},
          text: this.message,
          date: new Date()
      } as TicketMessage).subscribe(newmes => {
        this.ticket.ticketmessages.push(newmes)
        console.log(newmes)
        this.addmessage=false
      })
    }
  }

  voidSend() {
    this.addmessage=false;
    this.message=undefined;
  }

}
