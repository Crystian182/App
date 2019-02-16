import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../models/User';
import { Building } from '../../models/Building';
import { DomSanitizer } from '@angular/platform-browser';
import { ClassroomPage } from '../classroom/classroom';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { LoginPage } from '../login/login';

/**
 * Generated class for the BuildingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingPage {
  user: User;
  building: Building;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _DomSanitizer: DomSanitizer, private launchNavigator: LaunchNavigator, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.building = this.navParams.get('building');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    console.log(this.building)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingPage');
  }

  showClass(classroom) {
    this.navCtrl.push(ClassroomPage, {
      classroom: classroom,
      building: this.building
    })
  }

  showMap() {
    this.launchNavigator.navigate([this.building.lat, this.building.lng])
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
}
