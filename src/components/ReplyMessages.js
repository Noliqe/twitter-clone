import '../styles/replyMessages.css'
import React, { useState, useEffect } from 'react';
import { storage, db } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import speechBubble from '../assets/icons8-speech-bubble-24.png';
import replyMessage from './functions/reply';
import { documentId } from 'firebase/firestore';

const ReplyMessages = (props) => {
    const [messageImage, setMessageImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [replyImage, setReplyImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [message, setMessage] = useState('');

        // get messages which belongs to the reply
        useEffect(() => {
            if (props.messageId !== '') {
                db.collection("messages")
                .where(documentId(), "==", props.messageId)
                .get()
                .then((snapshot) => {
                    if (snapshot.size > 0) {
                        snapshot.forEach((doc) => {
                            setMessage(prev =>({...prev, 
                                name: doc.data().name,
                                uid: doc.data().uid,
                                date: doc.data().date,
                                id: doc.id,
                                text: doc.data().text,
                                userAt: doc.data().userAt}));
                        });
                    } else {
                        console.log('No Messages have been found!');
                    }
                });
            }
        }, [props.messageId]);

    //load profile image
    useEffect(() => {
        if (props.imagePath !== '') {
            storage
            .ref(`profile-pictures/${props.imagePath}`)
            .getDownloadURL()
            .then((url) => {
                setReplyImage(prev =>({...prev, image: url}));
            })
            .catch(() => {
                setReplyImage(prev =>({...prev, image: 'https://www.w3schools.com/howto/img_avatar.png'}));
            });
        }
    }, [props.imagePath]);

        //load profile image
        useEffect(() => {
            if (message !== '' && message.uid !== '') {
                storage
                .ref(`profile-pictures/${message.uid}`)
                .getDownloadURL()
                .then((url) => {
                    setMessageImage(prev =>({...prev, image: url}));
                })
                .catch(() => {
                    setMessageImage(prev =>({...prev, image: 'https://www.w3schools.com/howto/img_avatar.png'}));
                });
            }
        }, [message]);

    return (
        <div className='replyMessages'>
            <div className='replyMessages-message'>
                <div className='replyMessages-message-imageBar'>
                    <div className='replyMessages-message-image'>
                        <img src={messageImage.image} alt='message'></img>
                    </div>
                    <div className='replyMessages-message-bar-container'>
                    <div className='replyMessages-message-bar'></div>
                    </div>
                </div>
                <div className='replyMessages-message-container'>
                    <div className='replyMessages-message-container-names'>
                        <div className='replyMesages-message-userName' style={{ fontWeight: '700'}}>{message.name}</div>
                        <div className='replymessages-message-userAt' style={{ color: 'grey'}}>@{message.userAt}</div>
                        <div className='replymessages-message-date' style={{ color: 'grey'}}>{message.date}</div>
                    </div>
                    <div className='replyMessages-message-container-text'>
                        <p>{message.text}</p>
                    </div>
                </div>
            </div>


            <div className='replyMessages-reply'>
                <div className='replyMessages-reply-image'>
                    <img src={replyImage.image} alt='message'></img>
                </div>
                <div className='replyMessages-reply-container'>
                    <div className='replyMessages-reply-container-names'>
                        <div className='replyMesages-reply-userName' style={{ fontWeight: '700'}}>{props.name}</div>
                        <div className='replymessages-reply-userAt' style={{ color: 'grey'}}>@{props.userAt}</div>
                        <div className='replymessages-reply-date' style={{ color: 'grey'}}>{props.date}</div>
                    </div>
                    <div className='replyMessages-reply-container-text'>
                        <p>{props.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyMessages;