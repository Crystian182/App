import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClassProvider } from '../../providers/class/class';
import { Class } from '../../models/Class';

/**
 * Generated class for the ClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {
  classroom: Class;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public classProvider: ClassProvider) {
    this.classProvider.getClassById(navParams.data).subscribe(classroom=>{
      this.classroom = classroom;
      console.log(this.classroom)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassPage');
  }


}
