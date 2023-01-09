import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
  } from 'firebase/firestore';
import { auth } from '../../config/firebase-config';

const SaveMessage = (messageText, userAt, date) => {

    // Saves a new message to Cloud Firestore.
  async function saveMessage() {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        name: auth.currentUser.displayName,
        userAt: userAt,
        text: messageText,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        date: date,
        replys: [],
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }
  saveMessage();
}

export default SaveMessage