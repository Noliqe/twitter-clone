import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
  } from 'firebase/firestore';
import { auth } from '../../config/firebase-config';

const SaveMessage = (messageText, at) => {

    // Saves a new message to Cloud Firestore.
  async function saveMessage() {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        name: auth.currentUser.displayName,
        atUser: at,
        text: messageText,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp()
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }
  saveMessage();
}

export default SaveMessage