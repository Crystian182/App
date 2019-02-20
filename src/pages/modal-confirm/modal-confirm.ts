import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { File } from '../../models/File';

/**
 * Generated class for the ModalConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-confirm',
  templateUrl: 'modal-confirm.html',
})
export class ModalConfirmPage {
  file: File;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.file = this.navParams.get('file');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalConfirmPage');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
