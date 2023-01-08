import { serverTimestamp } from 'firebase/firestore';
import { auth, db, dbfirestore } from '../../config/firebase-config';

const replyMessage = (messageText, userAt, date, messageId) => {

    // Add a new document with a generated id.
    db.collection("replys").add({
        name: auth.currentUser.displayName,
        userAt: userAt,
        text: messageText,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        date: date,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        console.log(messageId);
        const usersRef = db.collection('messages').doc(messageId);

        // Atomically add a new reply to the messages array field.
        usersRef.update({
        replys: dbfirestore.FieldValue.arrayUnion(docRef.id)
      });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
});
}

export default replyMessage