import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore';
import { auth } from '../../config/firebase-config';

const uploadUser = (Name, At, date) => {

    // Saves a new user to Cloud Firestore.
async function uploadInfo() {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'users'), {
        name: Name,
        at: At,
        uid: auth.currentUser.uid,
        timestamp: date,
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }
  uploadInfo();
}

export default uploadUser