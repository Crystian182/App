import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Class } from '../../models/Class';
import { Building } from '../../models/Building';
import { Ticket } from '../../models/Ticket';
import { TicketProvider } from '../../providers/ticket/ticket';
import { User } from '../../models/User';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';

/**
 * Generated class for the ClassroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-classroom',
  templateUrl: 'classroom.html',
})
export class ClassroomPage {
  user: User;
classroom: Class
building: Building
tickets: Ticket[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public ticketProvider: TicketProvider, private launchNavigator: LaunchNavigator) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.classroom = this.navParams.get('classroom');
    this.building = this.navParams.get('building');
    this.ticketProvider.getAllTicketsByClassroom(this.classroom.id).subscribe(tickets => {
      this.tickets = tickets;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassroomPage');
  }

  trunk(title) {
    if(title[19] == undefined) {
      return title
    }
    let label: String = title
    console.log(label[19])
    return label.substring(0, 20) + '...'
  }

  showMap() {
    this.launchNavigator.navigate([this.classroom.lat, this.classroom.lng])
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  showTicket(ticket) {
    this.navCtrl.push(TicketDetailPage, {
      ticket: ticket
    })
  }
}
