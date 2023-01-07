import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore';
import { auth } from '../../config/firebase-config';

const uploadUser = (Name, at, date) => {

    // Saves a new user to Cloud Firestore.
async function uploadInfo() {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'users'), {
        name: Name,
        userAt: at,
        uid: auth.currentUser.uid,
        timestamp: date,
        followers: [],
        following: [],
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }
  uploadInfo();
}

export default uploadUser