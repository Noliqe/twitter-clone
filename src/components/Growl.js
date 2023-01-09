import { useParams } from "react-router-dom";
import arrow from '../assets/icons8-left-arrow-32.png';
import { Link } from 'react-router-dom';
import '../styles/growl.css';
import { storage, db } from "../config/firebase-config";
import replyMessage from "./functions/reply";
import React, { useState, useEffect } from 'react';
import { documentId } from "firebase/firestore";
import Message from "./Message";

const Growl = (props) => {
    const [messageImage, setMessageImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [message, setMessage] = useState('');
    const [replys, setReplys] = useState('');
    let { growlId } = useParams();

    useEffect(() => {
        db.collection("messages")
        .where(documentId(), "==", growlId)
        .get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => { 
                    setMessage(prev =>({...prev, 
                    name: doc.data().name,
                    uid: doc.data().uid,
                    date: doc.data().date,
                    id: doc.id,
                    replys: doc.data().replys,
                    userAt: doc.data().userAt,
                    text: doc.data().text}));
                });
            } else {
                console.log('users doesnt exist');
            }
        });
    }, []);

        //load profile image
        useEffect(() => {
            if (message.uid !== '') {
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

        useEffect(() => {
            db.collection("replys")
            .where("messageId", "==", growlId)
            .orderBy('timestamp', 'desc')
            .get()
            .then((snapshot) => {
                let arr = [];
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        arr.push({
                            name: doc.data().name,
                                uid: doc.data().uid,
                                date: doc.data().date,
                                id: doc.id,
                                text: doc.data().text,
                                userAt: doc.data().userAt,
                                messageId: doc.data().messageId});
                    });
                } else {
                    console.log('No Growls have been found!');
                }
                setReplys(arr);
            });
        }, []);


    const handleEvent = (event) => {
        event.preventDefault()
        let date = new Date().toLocaleDateString("en-US");
        replyMessage(event.target[0].value, props.current.userAt, date, message.id);
        event.target[0].value = '';
    }

    const handleReply = () => {
        if (props.loggedIn) {
            return (
                <div className="growl-reply-container">
                    <div className="growl-reply-container-image">
                        <img src={props.current.image} alt="reply"></img>
                    </div>
                    <form onSubmit={handleEvent}>
                            <input type='text' className='growl-reply-input' placeholder="Growl your reply"></input>
                            <input type='submit' value='Reply'></input>
                            </form>
                </div>
            )
        }
    }

    const handleMessages = () => {
        if (replys !== '') {
            let arr = [];
            for (let i = 0; i < replys.length; i++) {
                arr.push(
                    <Message 
                    key={i}
                    id={replys[i].id}
                    date={replys[i].date}
                    name={replys[i].name}
                    text={replys[i].text}
                    userAt={replys[i].userAt}
                    imagePath={replys[i].uid}
                    current={props.current}
                    />
                )
            }
            return (
                <div className='msg'>
                    {arr}
                </div>
            )
        }
    }

    return (
        <div className="growl">
            <div className="growl-topbar">
                <div className="growl-topbar-image">
                    <Link to='/'>
                        <img src={arrow} alt="arrow"></img>
                    </Link>
                </div>
                <div className="growl-topbar-growl" style={{fontSize: '18px', fontWeight: '700'}}>Growl</div>
                <div className="growl-topbar-empty"></div>
            </div>
            <div className="growl-message">
                <div className="growl-message-container">
                <div className="growl-message-image">
                    <img src={messageImage.image} alt="message"></img>
                </div>
                <div className="growl-message-names">
                    <div className="growl-message-names-username" style={{ fontWeight: '700'}}>{message.name}</div>
                    <div className="growl-message-names-userAt" style={{ color: 'grey'}}>@{message.userAt}</div>
                </div>
                </div>
                <div className="growl-message-text">
                    <p>{message.text}</p>
                </div>
                <div className="growl-message-date" style={{ color: 'grey'}}>{message.date}</div>
            </div>
            <div className="growl-reply">
                {handleReply()}
            </div>
            {handleMessages()}
        </div>
    )

}

export default Growl