import '../styles/explore.css';
import SaveMessage from './functions/saveMessage';
import Message from './Message';
import Searchbar from './searchbar';
import React, { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
  } from 'firebase/firestore';


const Content = (props) => {
    const [growls, setGrowls] = useState('');

    useEffect(() => {
        LoadMessage()
    }, []);

    const LoadMessage = () => {
        // Loads chat messages history and listens for upcoming ones.
        const recentMessagesQuery = query(collection(getFirestore(), 'messages'), orderBy('timestamp', 'desc'));
        
        let arr = [];
        // Start listening to the query.
        onSnapshot(recentMessagesQuery, function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              let message = change.doc.data();
              if (!change.doc.data().isReply) {
                arr.push({...message, id: change.doc.id})
            }
          });
          setGrowls(arr);
        });
        
    }

    const handleEvent = (event) => {
        event.preventDefault()
        let date = new Date().toLocaleDateString("en-US");
        console.log(event.target[0].value);
        SaveMessage(event.target[0].value, props.data.userAt, date);
        event.target[0].value = '';
        LoadMessage();
    }

    const handleMessages = () => {
        if (growls !== '') {
            let arr = [];
            for (let i = 0; i < growls.length; i++) {
                arr.push(
                    <Message 
                    key={i}
                    id={growls[i].id}
                    date={growls[i].date}
                    name={growls[i].name}
                    text={growls[i].text}
                    userAt={growls[i].userAt}
                    imagePath={growls[i].uid}
                    replys={growls[i].replys}
                    loggedIn={props.LoggedIn}
                    hearts={growls[i].hearts}
                    current={props.data}/>
                )
            }
            return (
                <div className='msg'>
                    {arr}
                </div>
            )
        }
    }

    const handleMessage = () => {
        return (
            <div className='explore-container'>
            <div className='explore-messages'>
                {handleMessages()}
            </div>
        </div>
        )
    }

    return (
        <div className="explore">
            <div className='explore-searchbar'>
            <Searchbar/>
            </div>
            {handleMessage()}
        </div>
    )
}

export default Content;