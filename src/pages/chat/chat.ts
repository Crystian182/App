import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ChatChannelPage } from '../chat-channel/chat-channel';
import { PreviewChat } from '../../models/PreviewChat';
import { ChatProvider } from '../../providers/chat/chat';
import {Observable} from 'rxjs/Rx';
import { ContactsPage } from '../contacts/contacts';

import { ChatMessage } from '../../models/ChatMessage';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { AngularFireDatabase } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';
import { SubjectStudy } from '../../models/SubjectStudy';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

 previewChat: PreviewChat[] = [];
  user: User;
  starting: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatService: ChatProvider,
              public events: Events,
              public fdb: AngularFireDatabase,
              private _DomSanitizer: DomSanitizer) {
                this.starting = true;
      this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
      this.events.subscribe('user:unauth', msg => {
        this.navCtrl.push(LoginPage)
      })

        this.fdb.list('/publicchat/', 
        ref => ref.orderByChild('users/' + this.user.iduser + '/iduser').equalTo(this.user.iduser)).valueChanges().subscribe(chat => {
          if(chat) {
          if(chat.length != 0) {
            for(let j=0; j<chat.length; j++) {
          let obj:any = chat[j]
              let msgs:ChatMessage[] = obj.messages
              let users:User[] = obj.users
              let subject:SubjectStudy = obj.subject
              let lastMsg: ChatMessage
              if(msgs!=undefined && msgs && Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read) {
              if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].idsender == this.user.iduser) {
                lastMsg ={
                  sender: this.user,
                  text: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].text,
                  date: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].date,
                  read: true
                }
              } else {
                if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read[this.user.iduser] == undefined) {
                  lastMsg ={
                    sender: users[Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].idsender],
                    text: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].text,
                    date: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].date,
                    read: false
                  }
                } else {
                  lastMsg ={
                    sender: users[Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].idsender],
                    text: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].text,
                    date: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].date,
                    read: true
                  }
                }
                
              }
            
            }
              let index = this.previewChat.findIndex(item => item.subject && item.subject.id == obj.subject.id);
              if(index == -1) {
                this.previewChat.push({
                  subject: subject,
                  lastMessage: lastMsg
                } as PreviewChat)
              } else {
                this.previewChat[index].lastMessage=lastMsg
                let temp: PreviewChat = this.previewChat[index]
                if(!this.starting && this.previewChat[index].lastMessage != undefined && this.previewChat[index].lastMessage.date) {
                  this.sortChat();
                }
              }
          }
        }
      }
        })
      this.fdb.list('/privatechat/', 
          ref => ref.orderByChild('user1/iduser').equalTo(this.user.iduser)).valueChanges().subscribe(chat => {
            if(chat.length != 0) {
              for(let j=0; j<chat.length; j++) {
              let obj:any = chat[j]
              let msgs:ChatMessage[] = obj.messages
              let toUser: User;
              if(obj.user1.iduser == this.user.iduser) {
                toUser = obj.user2
              } else {
                toUser = obj.user1
              }
              if(msgs && msgs != undefined) {
              let lastMsg: ChatMessage ={
                sender: {iduser: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].idsender, name: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].name, surname: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].surname},
                text: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].text,
                date: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].date
              }
              if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read != undefined) {
                if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read[this.user.iduser] == undefined) {
                  lastMsg.read = false
                } else {
                  lastMsg.read = true
                }
              }
              let index = this.previewChat.findIndex(item => item.toUser && item.toUser.iduser == toUser.iduser);
              if(index == -1) {
                this.previewChat.push({
                  toUser: toUser,
                  lastMessage: lastMsg
                } as PreviewChat)
              } else {
                this.previewChat[index].lastMessage=lastMsg
                let temp: PreviewChat = this.previewChat[index]
                if(!this.starting && this.previewChat[index].lastMessage != undefined && this.previewChat[index].lastMessage.date) {
                  this.sortChat();
                }
              }
              }
            }
            
            }
          })
          this.fdb.list('/privatechat/', 
          ref => ref.orderByChild('user2/iduser').equalTo(this.user.iduser)).valueChanges().subscribe(chat => {
            if(chat.length != 0) {
              for(let j=0; j<chat.length; j++) {
              let obj:any = chat[j]
              let msgs:ChatMessage[] = obj.messages
              let toUser: User;
              if(obj.user1.iduser == this.user.iduser) {
                toUser = obj.user2
              } else {
                toUser = obj.user1
              }
              if(msgs && msgs != undefined) {
              let lastMsg: ChatMessage ={
                  sender: {iduser: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].idsender, name: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].name, surname: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].surname},
                  text: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].text,
                  date: Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].date
                }
              if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read != undefined) {
                if(Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1].read[this.user.iduser] == undefined) {
                  lastMsg.read = false
                } else {
                  lastMsg.read = true
                }
              }
              let index = this.previewChat.findIndex(item => item.toUser && item.toUser.iduser == toUser.iduser);
              if(index == -1) {
                this.previewChat.push({
                  toUser: toUser,
                  lastMessage: lastMsg
                } as PreviewChat)
              } else {
                this.previewChat[index].lastMessage=lastMsg
                let temp: PreviewChat = this.previewChat[index]
                if(!this.starting && this.previewChat[index].lastMessage != undefined && this.previewChat[index].lastMessage.date) {
                  this.sortChat();
                }
              }
            }
            }
            }
            
          })

          
        
        setTimeout( () => {
          this.sortChat();
          this.starting=false;}, 2000 );
        
  }


  openChat(chat) {
   this.navCtrl.push(ChatChannelPage, {
      chat: chat
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  showContacts() {
    this.navCtrl.push(ContactsPage);
  }

  ionViewDidEnter() {
    /*this.chatService.getPreviewChat(JSON.parse(window.localStorage['currentUser'] || '[]').iduser).subscribe(previews => {
      this.previewChat = previews;
    });*/
   }

   sortChat() {
    this.previewChat.sort((a, b) => {
      if(a.lastMessage && !b.lastMessage) {
        return -1;
      } else if(!a.lastMessage && b.lastMessage) {
        return 1;
      } else if(a.lastMessage && b.lastMessage) {
        if(a.lastMessage.date < b.lastMessage.date) {
          return 1;
        } else if(a.lastMessage.date > b.lastMessage.date) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0
      }
    });
   }
}
