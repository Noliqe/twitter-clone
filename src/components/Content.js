import '../styles/content.css';
import SaveMessage from './functions/saveMessage';
import Message from './Message';
import DeviceContext from "./context/deviceContext";
import React, { useState, useEffect, useContext } from 'react';
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
  } from 'firebase/firestore';


const Content = (props) => {
    const [growls, setGrowls] = useState('');
    const [counter, setCounter] = useState(0);
    const { device } = useContext(DeviceContext);

    useEffect(() => {
        LoadMessage()
    }, []);

    useEffect(() => {
        if (counter > 0) {
            LoadMessage()
        }
    }, [counter]);

    const updateCounter = () => {
        return setCounter(counter +1);
    }

    const LoadMessage = () => {
        // Loads chat messages history and listens for upcoming ones.
        // Create the query to load the last 12 messages and listen for new ones.
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
                    current={props.data}
                    counter={updateCounter}/>
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
        if (props.loggedIn) {
            return (
                <div className='content-container'>
                    <div className='content-message'>
                    <p>Home</p>
                    <div className='content-message-container'>
                        <div className='content-profile-picture'>
                            <img src={props.data.image} alt='profile'></img>
                        </div>
                        <form onSubmit={handleEvent}>
                        <input type='text' className='content-message-input' placeholder="What's happening?"></input>
                        <div className='content-form-submit'>
                            <input type='submit' value='Growl'></input>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className='content-messages'>
                        {handleMessages()}
                    </div>
                </div>
            )
        }
        return (
            <div className='content-container'>
            <div className='content-messages'>
                {handleMessages()}
            </div>
        </div>
        )
    }

    const handleContentWidth = () => {
        if (device === 'computer') {
            return '250px'
        } else if (device === 'tablet') {
            return '210px'
        } else if (device === 'mobile') {
            return '110px'
        }
    }

    return (
        <div className="content" style={{ marginLeft: handleContentWidth() }}>
            {handleMessage()}
        </div>
    )
}

export default Content;