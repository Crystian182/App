import * as functions from 'firebase-functions';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp();

export const onPrivateMessageCreate = functions.database
.ref('privatechat/{roomId}/messages/{messageId}').onCreate((snapshot, context) => {
    const roomId = context.params.roomId
    const messageData = snapshot.val()

    const iduser1 = admin.database()
          .ref('privatechat/' + roomId + '/user1').once('value');
    const iduser2 = admin.database()
          .ref('privatechat/' + roomId + '/user2').once('value');

    return Promise.all([iduser1, iduser2]).then(users => {
            if(users[0].val().iduser == messageData.idsender) {
            const token = admin.database()
                .ref('tokens/' + users[1].val().iduser + '/token').once('value');
            Promise.all([token]).then(tok => {
                const payload = {
                    notification: {
                        title: users[0].val().name + ' ' + users[0].val().surname,
                        body: messageData.text
                    },
                    data: {
                        type: 'private',
                        iduser: `${users[0].val().iduser}`,
                        name: users[0].val().name,
                        surname: users[0].val().surname
                    }
                    };
                admin.messaging().sendToDevice(tok[0].val(), payload);
            })
            
        } else {
            const token = admin.database()
                .ref('tokens/' + users[0].val().iduser + '/token').once('value');
            Promise.all([token]).then(tok => {
                const payload = {
                    notification: {
                        title: users[1].val().name + ' ' + users[1].val().surname,
                        body: messageData.text
                        },
                        data: {
                        type: 'private',
                        iduser: `${users[1].val().iduser}`,
                        name: users[1].val().name,
                        surname: users[1].val().surname
                        }
                    };
                admin.messaging().sendToDevice(tok[0].val(), payload);
            })
        }
    })
})

export const onPublicMessageCreate = functions.database
.ref('publicchat/{roomId}/messages/{messageId}').onCreate((snapshot, context) => {
    const roomId = context.params.roomId
    const messageData = snapshot.val()

    const users = admin.database()
        .ref('publicchat/' + roomId + '/users').once('value');

    const senderinfo = admin.database()
        .ref('publicchat/' + roomId + '/users/' + messageData.idsender).once('value');

    const subjectinfo = admin.database()
        .ref('publicchat/' + roomId + '/subject/').once('value');

    return Promise.all([subjectinfo]).then(subjectinfo => {
        const subject = subjectinfo[0].val()

        Promise.all([senderinfo]).then(sendinfo => {
            const sender = sendinfo[0].val()

            Promise.all([users]).then(userstbn => {
                for(let usid in userstbn[0].val()) {
                    if(usid != messageData.idsender) {
                    const token = admin.database()
                        .ref('tokens/' + usid + '/token').once('value');
                    Promise.all([token]).then(tok => {
                        const payload = {
                            notification: {
                                title: sender.name + ' ' + sender.surname + ' in ' + subject.name,
                                body: messageData.text
                            },
                            data: {
                                type: 'public',
                                subjectid: `${subject.id}`,
                                subjectname: `${subject.name}`
                            }
                        };
                        admin.messaging().sendToDevice(tok[0].val(), payload);
                    })
                    }
                }
            })
        })
    })
})