import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { PreviewChat } from '../../models/PreviewChat';
import { ChatProvider } from '../../providers/chat/chat';
import { User } from '../../models/User';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatChannelPage } from '../chat-channel/chat-channel';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  previewChat: PreviewChat[] = [];
  user: User;
  keyword: String = undefined;
  searching: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public chatService: ChatProvider, public _DomSanitizer: DomSanitizer, public events: Events,
  public fdb: AngularFireDatabase, public alertCtrl: AlertController) {
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  search(keyword) {
    
  }

  onInput($event) {
    if(this.keyword == '') {
      this.previewChat=[];
      this.keyword = undefined;
    } else {
      this.searching=true;
      this.chatService.search(this.user.iduser, this.keyword).subscribe(previews => {
        this.previewChat = previews;
      })
      this.searching=false;
    }
    
  }

  presentConfirm(chat, operation) {
    let alert = this.alertCtrl.create({
      title: 'Conferma iscrizione',
      message: 'Vuoi unirti a questo gruppo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confermo',
          handler: () => {
            if(operation == 'create') {
              this.fdb.list("/publicchat/").push({subject: {id: chat.subject.id, name: chat.subject.name + ' ' + chat.subject.term.academicYear.year + '/' + (chat.subject.term.academicYear.year+1)}, users: {temp: {iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, propic: this.user.propic}}})
            
                this.fdb.list('/publicchat/', 
                ref => ref.orderByChild('subject/id').equalTo(chat.subject.id)).snapshotChanges().subscribe(data => {
                  if(data.length != 0) {
                    let obj:any = JSON.stringify(data[0])
                    this.fdb.database.ref("/publicchat/" + JSON.parse(obj).key + "/users/").child(`${this.user.iduser}`).set({iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, propic: this.user.propic});
                    this.fdb.list("/publicchat/" + JSON.parse(obj).key + "/users/temp").remove()
                  }
                })
              
            } else {
              this.fdb.list('/publicchat/', 
                ref => ref.orderByChild('subject/id').equalTo(chat.subject.id)).snapshotChanges().subscribe(data => {
                  if(data.length != 0) {
                    let obj:any = JSON.stringify(data[0])
                    this.fdb.database.ref("/publicchat/" + JSON.parse(obj).key + "/users/").child(`${this.user.iduser}`).set({iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, propic: this.user.propic});
                  }
                })
            }
            this.navCtrl.push(ChatChannelPage, {
              chat: chat
            });
          }
        }
      ]
    });
    alert.present();
  }

  openChat(chat) {
    if(chat.subject) {
      let objectSubscription = this.fdb.list('/publicchat/', 
      ref => ref.orderByChild('subject/id').equalTo(chat.subject.id)).valueChanges().subscribe(chatfb => {
        if(chatfb.length != 0) {
          let obj:any = chatfb[0]
          let users:User[] = obj.users
          if(users[this.user.iduser] == undefined) { //esiste già ma non è iscritto
            this.presentConfirm(chat, 'add')
          } else {
            this.navCtrl.push(ChatChannelPage, {
              chat: chat
            });
          }
        } else { //non esiste
          this.presentConfirm(chat, 'create')
        }
        objectSubscription.unsubscribe();
      })
      
    } else {
      this.navCtrl.push(ChatChannelPage, {
        chat: chat
      });
    }
  }

  onCancel($event){
    
    this.previewChat=[];
  }

}
