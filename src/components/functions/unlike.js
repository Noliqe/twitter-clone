import { db, dbfirestore } from '../../config/firebase-config';

const unLike = ( userAt, messageId) => {
        const usersRef = db.collection('messages').doc(messageId);

        // remove a like
        usersRef.update({
        hearts: dbfirestore.FieldValue.arrayRemove(userAt)
      });

}

export default unLike