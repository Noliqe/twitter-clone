import { db, dbfirestore } from '../../config/firebase-config';

const like = ( userAt, messageId) => {
        const usersRef = db.collection('messages').doc(messageId);

        // add a like
        usersRef.update({
        hearts: dbfirestore.FieldValue.arrayUnion(userAt)
      });

}

export default like