import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Events, Content } from 'ionic-angular';
import { ChatProvider, UserInfo } from '../../providers/chat/chat';
import { ChatMessage } from '../../models/ChatMessage';
import {Observable} from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/User';
import { LoginPage } from '../login/login';
import { PreviewChat } from '../../models/PreviewChat';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Navbar } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-chat-channel',
  templateUrl: 'chat-channel.html',
})
export class ChatChannelPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  @ViewChild(Navbar) navBar: Navbar;
  
  editorMsg = '';
  showEmojiPicker = false;
  messages: ChatMessage[] = [];
  chat: PreviewChat;
  user: User;
  toUser: User;
  key: any;
  loading: boolean = true;
  loadingg: any;

  constructor(public navParams: NavParams,
              private events: Events,
              public chatService: ChatProvider,
              public _DomSanitizer: DomSanitizer,
              public navCtrl: NavController,
              public fdb: AngularFireDatabase,
              public push: Push,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
                this.loadingg = this.loadingCtrl.create({
              });
              this.loadingg.present();
    this.events.subscribe('user:unauth', msg => {
      this.navCtrl.push(LoginPage)
    })
    
    this.user = JSON.parse(window.localStorage['currentUser'] || '[]');
    this.chat = this.navParams.get('chat');
    this.initPushNotification();
    if(this.chat.subject) {
        this.fdb.list('/publicchat/', 
      ref => ref.orderByChild('subject/id').equalTo(this.chat.subject.id)).snapshotChanges().subscribe(data => {
        if(data.length != 0) {
          let obj:any = JSON.stringify(data[0])
          this.key = JSON.parse(obj).key
          if(this.key != undefined) {
            this.loading = false
            let i: number = 1
            if(JSON.parse(obj).payload.messages && this.navCtrl.getActive().component.name == 'ChatChannelPage') {
            for(let msg of Object.keys(JSON.parse(obj).payload.messages)) {
              if(i==Object.keys(JSON.parse(obj).payload.messages).map(key => JSON.parse(obj).payload.messages[key]).length) {
                this.fdb.database.ref("/publicchat/" + this.key + "/messages/" + msg + "/read").child(`${this.user.iduser}`).set(true);
              }
              i++
            }
            }
          }
        }
      })

      this.fdb.list('/publicchat/', 
        ref => ref.orderByChild('subject/id').equalTo(this.chat.subject.id)).valueChanges().subscribe(chat => {
          if(chat) {
          if(chat.length != 0) {
            
            let obj:any = chat[0]
            if (obj.messages && obj.messages != undefined) {
            let msgs:ChatMessage[] = obj.messages
            let users:User[] = obj.users
            //this.messages = []
            if(msgs && msgs != undefined) {
              if(Object.keys(msgs).map(key => msgs[key])) {
                if(this.messages.length > 0 && (this.messages.length+1 == Object.keys(msgs).map(key => msgs[key]).length)) {
                  let msg: any = Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1]
                  if(msg.read) {
                    if(this.user.iduser == msg.idsender) {
                      this.messages.push({
                        sender: this.user,
                        text: msg.text,
                        date: msg.date
                      } as ChatMessage)
                    } else {
                      this.messages.push({
                        sender: users[msg.idsender],
                        text: msg.text,
                        date: msg.date
                      } as ChatMessage)
                    }
                  }
                } else if(this.messages.length == 0) {
                  for(let msg of Object.keys(msgs).map(key => msgs[key])){
                    if(msg.read) {
                      if(this.user.iduser == msg.idsender) {
                        this.messages.push({
                          sender: this.user,
                          text: msg.text,
                          date: msg.date
                        } as ChatMessage)
                      } else {
                        this.messages.push({
                          sender: users[msg.idsender],
                          text: msg.text,
                          date: msg.date
                        } as ChatMessage)
                      }
                    }
                  }
                }
            }
            }
            this.scrollToBottom();
          }
          }
          }
        })
    } else {
      if(!this.chat.toUser.propic) {
        this.chatService.getPropic(this.chat.toUser.iduser).subscribe(user => {
          this.chat.toUser.propic = user.propic
        })
      }
      this.fdb.list('/privatechat/', 
      ref => ref.orderByChild('users').equalTo(this.user.iduser + '_' + this.chat.toUser.iduser)).snapshotChanges().subscribe(data => {
        if(data.length != 0) {
          let obj:any = JSON.stringify(data[0])
          this.key = JSON.parse(obj).key
          if(this.key != undefined) {
            let i: number = 1
            if(JSON.parse(obj).payload.messages && this.navCtrl.getActive().component.name == 'ChatChannelPage') {
              for(let msg of Object.keys(JSON.parse(obj).payload.messages)) {
                if(i==Object.keys(JSON.parse(obj).payload.messages).map(key => JSON.parse(obj).payload.messages[key]).length) {
                  this.fdb.database.ref("/privatechat/" + this.key + "/messages/" + msg + "/read").child(`${this.user.iduser}`).set(true);
                }
                i++
              }
            }
          }
        }
        this.fdb.list('/privatechat/', 
          ref => ref.orderByChild('users').equalTo(this.user.iduser + '_' + this.chat.toUser.iduser)).valueChanges().subscribe(chat => {
            
            if(chat.length != 0) {
              let obj:any = chat[0]
              let msgs:ChatMessage[] = obj.messages

              //this.messages = []
              if(msgs && msgs != undefined) {
                if(Object.keys(msgs).map(key => msgs[key])) {
                  if(this.messages.length > 0 && (this.messages.length+1 == Object.keys(msgs).map(key => msgs[key]).length)) {
                    let msg: any = Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1]
                    if(msg.read) {
                      if(msg.idsender == this.chat.toUser.iduser) {
                        this.messages.push({
                          sender: this.chat.toUser,
                          text: msg.text,
                          date: msg.date
                        } as ChatMessage)
                      } else {
                        this.messages.push({
                          sender: this.user,
                          text: msg.text,
                          date: msg.date
                        } as ChatMessage)
                      }
                    }
                  } else if(this.messages.length == 0){
                    for(let msg of Object.keys(msgs).map(key => msgs[key])){
                      if(msg.read) {
                        if(msg.idsender == this.chat.toUser.iduser) {
                          this.messages.push({
                            sender: this.chat.toUser,
                            text: msg.text,
                            date: msg.date
                          } as ChatMessage)
                        } else {
                          this.messages.push({
                            sender: this.user,
                            text: msg.text,
                            date: msg.date
                          } as ChatMessage)
                        }
                      }
                    }
                  }
                }
              }
              
              this.scrollToBottom();
            }
          })
      })
      if(!this.key) {
      this.fdb.list('/privatechat/', 
        ref => ref.orderByChild('users').equalTo(this.chat.toUser.iduser + '_' + this.user.iduser)).snapshotChanges().subscribe(data => {
          if(data.length != 0) {
            let obj:any = JSON.stringify(data[0])
            this.key = JSON.parse(obj).key
            if(this.key != undefined) {
              let i: number = 1
              if(JSON.parse(obj).payload.messages && this.navCtrl.getActive().component.name == 'ChatChannelPage') {
                for(let msg of Object.keys(JSON.parse(obj).payload.messages)) {
                  if(i==Object.keys(JSON.parse(obj).payload.messages).map(key => JSON.parse(obj).payload.messages[key]).length) {
                    this.fdb.database.ref("/privatechat/" + this.key + "/messages/" + msg + "/read").child(`${this.user.iduser}`).set(true);
                  }
                  i++
                }
              }
            }
          }
          this.fdb.list('/privatechat/', 
            ref => ref.orderByChild('users').equalTo(this.chat.toUser.iduser + '_' + this.user.iduser)).valueChanges().subscribe(chat => {
              if(chat.length != 0) {
                let obj:any = chat[0]
                let msgs:ChatMessage[] = obj.messages
                //this.messages = []
                if(msgs && msgs != undefined) {
                    if(Object.keys(msgs).map(key => msgs[key])) {
                      if(this.messages.length > 0 && (this.messages.length+1 == Object.keys(msgs).map(key => msgs[key]).length)) {
                        let msg: any = Object.keys(msgs).map(key => msgs[key])[Object.keys(msgs).map(key => msgs[key]).length-1]
                        if(msg.read) {
                          if(msg.idsender == this.chat.toUser.iduser) {
                            this.messages.push({
                              sender: this.chat.toUser,
                              text: msg.text,
                              date: msg.date
                            } as ChatMessage)
                          } else {
                            this.messages.push({
                              sender: this.user,
                              text: msg.text,
                              date: msg.date
                            } as ChatMessage)
                          }
                        }
                      } else if(this.messages.length == 0) {
                        for(let msg of Object.keys(msgs).map(key => msgs[key])){
                          if(msg.read) {
                            if(msg.idsender == this.chat.toUser.iduser) {
                              this.messages.push({
                                sender: this.chat.toUser,
                                text: msg.text,
                                date: msg.date
                              } as ChatMessage)
                            } else {
                              this.messages.push({
                                sender: this.user,
                                text: msg.text,
                                date: msg.date
                              } as ChatMessage)
                            }
                          }
                        }
                      }
                    }
                  }
                
                this.scrollToBottom();
              }
            })
        })
          
      }
    }
    setTimeout( () => {
      this.loadingg.dismiss()}, 2000 );
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    let newMsg:any = {
      idsender: this.user.iduser,
      text: this.editorMsg,
      date: Date.now()
    };
    
    this.editorMsg = '';

    this.scrollToBottom();

    if(this.chat.subject && this.key != undefined) {
      this.fdb.database.ref("/publicchat/" + this.key + "/users/").child(`${this.user.iduser}`).set({iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, propic: this.user.propic});
      let obj: any = this.fdb.list("/publicchat/" + this.key + "/messages/").push(newMsg)
      this.fdb.database.ref("/publicchat/" + this.key + "/messages/" + obj.path.pieces_[3] + "/read").child(`${this.user.iduser}`).set(true);
    } else if(this.chat.toUser && this.key != undefined) {
      let obj: any = this.fdb.list("/privatechat/" + this.key + "/messages").push(newMsg)
      this.fdb.database.ref("/privatechat/" + this.key + "/messages/" + obj.path.pieces_[3] + "/read").child(`${this.user.iduser}`).set(true);
    } else if(this.chat.toUser && this.key == undefined) {
      let obj: any = this.fdb.list("/privatechat/").push({users: this.user.iduser + '_' + this.chat.toUser.iduser,
                                                        user1: {iduser: this.user.iduser, name: this.user.name, surname: this.user.surname, propic: this.user.propic },
                                                        user2: {iduser: this.chat.toUser.iduser, name: this.chat.toUser.name, surname: this.chat.toUser.surname, propic: this.chat.toUser.propic }})
      this.key = obj.path.pieces_[1]
      let obj2: any = this.fdb.list("/privatechat/" + this.key + "/messages/").push(newMsg)
      this.fdb.database.ref("/privatechat/" + this.key + "/messages/" + obj2.path.pieces_[3] + "/read").child(`${this.user.iduser}`).set(true);
      //this.fdb.list("/privatechat/" + this.key + "/messages/temp").remove()
    }
  }

  scrollToBottom() {
    if(this.content._scroll) {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(200);
      }
    }, 400)
  }
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  public displayDate(dat) {
    let date = new Date(dat)
    let today: Date = new Date;
    if(today.toDateString() == date.toDateString()) {
      return 'Oggi'
    } 
    today.setDate(today.getDate() - 1);
    if(today.toDateString() == date.toDateString()) {
      return 'Ieri'
    } else {
      return date
    }
  }

  /*ionViewDidEnter() {
    //get message list
    this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }
/*
  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  /*getMsg() {
    // Get mock message list
    return this.chatService
    .getMsgList()
    .subscribe(res => {
      this.msgList = res;
      this.scrollToBottom();
    });
  }

  /**
   * @name sendMsg
   */
  /*sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
    .then(() => {
      let index = this.getMsgIndexById(id);
      if (index !== -1) {
        this.msgList[index].status = 'success';
      }
    })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
 /* pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }*/
  /*ionViewDidEnter() {
    this.navBar.backButtonClick = this.backButtonClick;
   }

   backButtonClick() {
    console.log('// dos omething')
   }*/

   initPushNotification() {
    const options: PushOptions = {
      android: {
        senderID: '901075046844'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   }
   
   const pushObject: PushObject = this.push.init(options);   

   pushObject.on('notification').subscribe((notification: any) => {
    
    let toast = this.toastCtrl.create({
      message: notification.title + ": " + notification.message,
      duration: 5000,
      position: 'top',
      dismissOnPageChange: true
    });
    if(notification.additionalData.type == 'private') {
      if(this.chat.toUser) {
        if(notification.additionalData.iduser != this.chat.toUser.iduser) {
          toast.present();
        }
      } else {
        toast.present();
      }
    } else {
      if(this.chat.subject) {
        if(notification.additionalData.subjectid != this.chat.subject.id) {
          toast.present();
        }
      } else {
        toast.present();
      }
    }
      
  });
  }
}
