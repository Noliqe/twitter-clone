import { db, dbfirestore } from '../../config/firebase-config';

const follow = (id, userAt, currentUser, currentUserId) => {
    if (userAt !== currentUser) {
        const usersRef = db.collection('users').doc(id);

        // Atomically add a new follower to the following array field.
        // Get's a follower
        usersRef.update({
        followers: dbfirestore.FieldValue.arrayUnion(currentUser)
      });

        const currentUsersRef = db.collection('users').doc(currentUserId);
        // is following
        currentUsersRef.update({
        following: dbfirestore.FieldValue.arrayUnion(userAt)
      });
      console.log('followed!');
    } else {
        console.log('Same Person!');
    }

}

export default follow