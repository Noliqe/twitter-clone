import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
  } from 'firebase/firestore';
import { auth } from '../../config/firebase-config';
import getProfilePicUrl from './profilePicture';

const SaveMessage = (messageText) => {

// Returns the signed-in user's display name.
function getUserName() {
    return auth.currentUser.displayName;
}

    // Saves a new message to Cloud Firestore.
async function saveMessage() {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
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