import { db, dbfirestore } from '../../config/firebase-config';

const follow = (id, userAt) => {
    const usersRef = db.collection('users').doc(id);

    // Atomically add a new follower to the following array field.
    usersRef.update({
    following: dbfirestore.FieldValue.arrayUnion(userAt)
  });


}

export default follow