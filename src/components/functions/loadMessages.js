import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
  } from 'firebase/firestore';

const LoadMessage = () => {

// Delete a Message from the UI.
function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  }

    // Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
    
    // Start listening to the query.
    onSnapshot(recentMessagesQuery, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
        //   displayMessage(change.doc.id, message.timestamp, message.name,
        //                 message.text, message.profilePicUrl, message.imageUrl);
        }
      });
    });
  }
  loadMessages();

  
}

export default LoadMessage;