import '../styles/content.css';
import getProfilePicUrl from './functions/profilePicture';
import SaveMessage from './functions/saveMessage';
import Message from './Message';
import React, { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
    doc,
  } from 'firebase/firestore';


const Content = (props) => {
    const [growls, setGrowls] = useState('');

    useEffect(() => {
        LoadMessage()
    }, []);

    const LoadMessage = () => {
        // Loads chat messages history and listens for upcoming ones.
        // Create the query to load the last 12 messages and listen for new ones.
        const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'), limit(12));
        
        let arr = [];
        // Start listening to the query.
        onSnapshot(recentMessagesQuery, function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              let message = change.doc.data();
                arr.push({...message, id: change.doc.id})
            //   arr.push([change.doc.id, message.timestamp, message.name,
            //                 message.text, message.profilePicUrl, message.imageUrl]);
          });
          setGrowls(arr);
        });
        
    }

    const handleEvent = (event) => {
        event.preventDefault()
        console.log(event.target[0].value);
        SaveMessage(event.target[0].value);
        event.target[0].value = '';
    }

    const handleMessages = () => {
        let arr = [];
        for (let i = 0; i < growls.length; i++) {
            arr.push(
                <Message 
                key={i}
                id={growls[i].id}
                timestamp={growls[i].timestamp}
                name={growls[i].name}
                text={growls[i].text}
                picUrl={growls[i].profilePicUrl}/>
            )
        }
        return (
            <div className='msg'>
                {arr}
            </div>
        )
    }

    const handleMessage = () => {
        if (props.loggedIn) {
            return (
                <div className='content-container'>
                    <div className='content-message'>
                    <h2>Home</h2>
                    <div className='content-message-container'>
                        <div className='content-profile-picture'>
                            <img src={getProfilePicUrl()} alt='profile'></img>
                        </div>
                        <form onSubmit={handleEvent}>
                        <input type='text' className='content-message-input' placeholder="What's happening?"></input>
                        <input type='submit'></input>
                        </form>
                    </div>
                    </div>
                    <div className='content-messages'>
                        {handleMessages()}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="content">
            {handleMessage()}
        </div>
    )
}

export default Content;