import '../styles/explore.css';
import Message from './Message';
import Searchbar from './searchbar';
import React, { useState, useEffect, useContext } from 'react';
import DeviceContext from "./context/deviceContext";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
  } from 'firebase/firestore';


const Explore = (props) => {
    const [growls, setGrowls] = useState('');
    const { device } = useContext(DeviceContext);

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

    const handleExploreWidth = () => {
        if (device === 'computer') {
            return '250px'
        } else if (device === 'tablet') {
            return '210px'
        } else if (device === 'mobile') {
            return '110px'
        }
    }

    return (
        <div className="explore" style={{ marginLeft: handleExploreWidth() }}>
            <div className='explore-searchbar'>
            <Searchbar/>
            </div>
            {handleMessage()}
        </div>
    )
}

export default Explore;