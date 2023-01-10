import { serverTimestamp } from 'firebase/firestore';
import { auth, db, dbfirestore } from '../../config/firebase-config';

const reGrowl = (messageText, userAt, date, messageId, name, uid, currentUserAt) => {

    // Add a new document with a generated id.
    db.collection("messages").add({
        name: name,
        userAt: userAt,
        text: messageText,
        uid: uid,
        timestamp: serverTimestamp(),
        date: date,
        replys: [],
        hearts: [],
        replyTo: '',
        replyId: '',
        isReply: false,
        isRetweet: true,
        retweets: [],
        currentUserAt: currentUserAt,
    })
    .then(function(docRef) {
        const usersRef = db.collection('messages').doc(messageId);

        // Atomically add a new reply to the messages array field.
        usersRef.update({
            retweets: dbfirestore.FieldValue.arrayUnion(docRef.id)
      });
      console.log('ReGrowled!');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
});
}

export default reGrowl