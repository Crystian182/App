import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from '../../models/User';
import { Building } from '../../models/Building';
import { BuildingProvider } from '../../providers/building/building';
import { BuildingPage } from '../building/building';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class DepartmentPage {
  user:User;
  buildings: Building[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public buildingProvider: BuildingProvider, public _DomSanitizer: DomSanitizer, public events: Events) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    this.buildingProvider.getAll().subscribe(buildings => {
      this.buildings = buildings
      console.log(this.buildings)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepartmentPage');
  }

  showBuilding(building) {
    this.navCtrl.push(BuildingPage, {
      building: building
    });
  }

}