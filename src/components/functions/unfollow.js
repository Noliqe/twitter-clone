import { db, dbfirestore } from '../../config/firebase-config';

const unFollow = (id, userAt, currentUser, currentUserId) => {
    if (userAt !== currentUser) {
        const usersRef = db.collection('users').doc(id);

        // Atomically removes a follower to the 'following' array field.
        // lost a follower
        usersRef.update({
        followers: dbfirestore.FieldValue.arrayRemove(currentUser)
      });

        const currentUsersRef = db.collection('users').doc(currentUserId);
        // is following
        currentUsersRef.update({
        following: dbfirestore.FieldValue.arrayRemove(userAt)
      });
      console.log('unfollowed!');
    } else {
        console.log('Same Person!');
    }
}

export default unFollow