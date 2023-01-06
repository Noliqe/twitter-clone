import '../styles/message.css'
import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';

const Message = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});

    useEffect(() => {
        storage
        .ref(`profile-pictures/${props.imagePath}`)
        .getDownloadURL()
        .then((url) => {
            setImage(prev =>({...prev, image: url}));
        })
        .catch(() => {
          setImage(prev =>({...prev, image: 'https://www.w3schools.com/howto/img_avatar.png'}));
        });
    }, []);

    return (
        <div className="msg-container">
            <div className="msg-picUrl">
                <img src={image.image} alt='profile'></img>
            </div>
            <div className="msg-subcontainer" id={props.id} timestamp={props.timestamp}>
                <div className='msg-subcontainer-top'>
                    <div className="msg-userName">{props.name}</div>
                    <div className='msg-@'>@{props.userAt}</div>
                    <div className='msg-date'>{props.date}</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
        </div>
    )
}

export default Message;