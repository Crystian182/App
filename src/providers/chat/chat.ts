import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { PreviewChat } from '../../models/PreviewChat';
import { ChatMessage } from '../../models/ChatMessage';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { User } from '../../models/User';
import { GlobalProvider } from '../global/global';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/*export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}*/

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatProvider {

  private stompClient;
  getPreviewChatUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getPreviews';
  getMessagesUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getMessages/idchat=';
  sendMessageUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/send';
  getContactsUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getContacts/userid=';
  getSubscribedCoursesUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getSubscribedCourses/userid=';
  getPropicUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getpropic';
  readAllUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/readall/idchat=';
  isReadUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/isread/idmessage=';
  getChatUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getPreview/user1=';
  getProfileUserUrl: string = 'http://' + this.global.address + ':8080/SpringApp/chat/getProfileUser';

  constructor(private http: HttpClient,
    private events: Events, private global: GlobalProvider) {
}

getPreviewChat(iduser: number): Observable<PreviewChat[]> {
  return this.http.get<PreviewChat[]>(this.getPreviewChatUrl + '/' + iduser);
}

getMessages(idchat: number, iduser: number): Observable<ChatMessage[]> {
  return this.http.get<ChatMessage[]>(this.getMessagesUrl + idchat + '&iduser=' + iduser);
}

sendMessage(idchat: number, message: ChatMessage): Observable<String> {
  return this.http.post<String>(this.sendMessageUrl + '/' + idchat, message);
}

search(iduser: number, keyword: String): Observable<PreviewChat[]> {
  return this.http.get<PreviewChat[]>(this.getContactsUrl + iduser + '&keyword=' + keyword);
}

getSubscribedCourses(iduser: number): Observable<PreviewChat[]> {
  return this.http.get<PreviewChat[]>(this.getSubscribedCoursesUrl + iduser);
}

getPropic(iduser: number): Observable<User> {
  return this.http.get<User>(this.getPropicUrl + '/' + iduser);
}

getProfileUser(iduser: number): Observable<User> {
  return this.http.get<User>(this.getProfileUserUrl + '/' + iduser);
}

readAll(iduser: number, idchat: number): Observable<String> {
  return this.http.get<String>(this.readAllUrl + idchat + '&iduser=' + iduser);
}

isRead(idmessage: number, iduser: number): Observable<boolean> {
  return this.http.get<boolean>(this.isReadUrl + idmessage + '&iduser=' + iduser);
}

getChat(iduser1: number, iduser2: number): Observable<PreviewChat> {
  return this.http.get<PreviewChat>(this.getChatUrl + iduser1 + '&user2=' + iduser2);
}

initializeWebSocketConnection(chatids: number[], iduser: number){
  let ws = new SockJS('http://http://192.168.1.11:8080/SpringApp/socket');
  this.stompClient = Stomp.over(ws);
  let that = this;
  this.stompClient.connect({}, function(frame) {
    that.stompClient.subscribe("/touser/" + iduser, (message) => {
      if(message.body) {
        that.events.publish('chat:channel', JSON.parse(message.body));
        }
    });
    for(let n of chatids) {
      that.stompClient.subscribe("/subscribe/" + n, (message) => {
        if(message.body) {
          that.events.publish('chat:channel', JSON.parse(message.body));
          }
      });
    }
    
  });
}

subscribe(idchat: number) {
  console.log('/subscribe/' + idchat)
  let ws = new SockJS('http://http://192.168.1.11:8080/SpringApp/socket');
  this.stompClient = Stomp.over(ws);
  let that = this;
  this.stompClient.connect({}, function(frame) {
  that.stompClient.subscribe("/subscribe/" + idchat, (message) => {
    if(message.body) {
      that.events.publish('chat:channel', JSON.parse(message.body));
      }
  });
})
}

sendMessage2(chatid: number, message: String){
  this.stompClient.send("/chat/send/" + chatid, {}, message);
}

/*mockNewMsg(msg) {
const mockMsg: ChatMessage = {
messageId: Date.now().toString(),
userId: '210000198410281948',
userName: 'Hancock',
userAvatar: './assets/to-user.jpg',
toUserId: '140000198202211138',
time: Date.now(),
message: msg.message,
status: 'success'
};

setTimeout(() => {
this.events.publish('chat:received', mockMsg, Date.now())
}, Math.random() * 1800)
}

getMsgList(): Observable<ChatMessage[]> {
const msgListUrl = './assets/mock/msg-list.json';
return this.http.get<any>(msgListUrl)
.pipe(map(response => response.array));
}

sendMsg(msg: ChatMessage) {
return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
.then(() => this.mockNewMsg(msg));
}

getUserInfo(): Promise<UserInfo> {
const userInfo: UserInfo = {
id: '140000198202211138',
name: 'Luff',
avatar: './assets/user.jpg'
};
return new Promise(resolve => resolve(userInfo));
}*/

}
