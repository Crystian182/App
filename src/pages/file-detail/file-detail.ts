import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { File } from '../../models/File';
import { Feedback } from '../../models/Feedback';
import { LessonProvider } from '../../providers/lesson/lesson';
import { User } from '../../models/User';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File as Fil } from '@ionic-native/file';  
import { GlobalProvider } from '../../providers/global/global';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the FileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-file-detail',
  templateUrl: 'file-detail.html',
})
export class FileDetailPage {
  file: File;
  posted: boolean = false;
  feedbacks: Feedback[] = [];
  idlesson: number;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl : ModalController, public events: Events,
  public lessonProvider: LessonProvider, private transfer: FileTransfer,
public fil: Fil, public fileOpener: FileOpener, public global: GlobalProvider) {
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.file = this.navParams.get('file');
    this.idlesson = this.navParams.get('idlesson');
    console.log(this.file)
    this.lessonProvider.getFeedbackFile(this.file.idFile).subscribe(feedbacks => {
      this.feedbacks = feedbacks
      console.log(this.feedbacks)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileDetailPage');
  }

  canPostFeedbackFile() {
    let index = this.feedbacks.findIndex(item => item.user.iduser == this.user.iduser);
      if(index == -1) {
        return true;
      } else {
        return false;
      }
  }

  addFeed() {
    var data = { file: this.file, idlesson: this.idlesson };
    var modalPage = this.modalCtrl.create('ModalFeedbackPage',data);
    modalPage.present();
    this.events.subscribe('feedfile:added', (feed) => {
      this.feedbacks.push(feed)
      this.posted = true;
      if(this.feedbacks.length == 0) {
        let starz: number = (Number(this.file.stars) + feed.stars)
        this.file.stars = starz;
      } else {
        let starz: number = (Number(this.file.stars) + feed.stars)/2
        this.file.stars = starz;
      }
      
    });
  }

  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://' + this.global.address + ':8080/SpringApp/file/download/filelesson/' + this.file.idFile;
      fileTransfer.download(url, this.fil.externalDataDirectory + this.file.name).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        var modalPage = this.modalCtrl.create('ModalConfirmPage');
        modalPage.present();
        this.fileOpener.open(entry.toURL(), 'application/com.sec.android.app.myfiles')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      }, (error) => {
        console.log(error)
      });
  }

}
