import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
  } from 'firebase/firestore';
import displayMessage from './displayMessage';

const LoadMessage = () => {
    // Loads chat messages history and listens for upcoming ones.
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
    
    let arr = [];
    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          var message = change.doc.data();
          arr.push([change.doc.id, message.timestamp, message.name,
                        message.text, message.profilePicUrl, message.imageUrl]);
      });
    });
    return arr;
}

export default LoadMessage;