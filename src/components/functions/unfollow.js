import { db, dbfirestore } from '../../config/firebase-config';

const unFollow = (id, userAt) => {
    const usersRef = db.collection('users').doc(id);

    // Atomically remove a follower from the "following" array field.
    usersRef.update({
    following: dbfirestore.FieldValue.arrayRemove(userAt)
    });

}

export default unFollow