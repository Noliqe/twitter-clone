import '../styles/message.css'
import React, { useState, useEffect } from 'react';
import { storage, db, auth } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import speechBubble from '../assets/icons8-speech-24-grey.png';
import heart from '../assets/icons8-favorite-24.png';
import redHeart from '../assets/icons8-favorite-24-red.png';
import close from '../assets/icons8-close-24.png';
import replyMessage from './functions/reply';
import { useNavigate } from 'react-router-dom';
import like from './functions/like';
import unLike from './functions/unlike';
import { documentId } from 'firebase/firestore';

const Message = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [display, setDisplay] = useState(false);
    const [likes, setLikes] = useState('');
    const [userLikes, setUserLikes] = useState(false);
    const [heartIMG, setHeartImg] = useState(heart);
    const navigate = useNavigate();

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
    }, [props.imagePath]);

    useEffect(() => {
        loadHearts();
    }, []);

    useEffect(() => {
        if (userLikes) {
            return setHeartImg(redHeart);
        }
        return setHeartImg(heart);
    }, [userLikes]);

    const loadHearts = () => {
        db.collection("messages")
        .where(documentId(), "==", props.id)
        .get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    return setLikes({hearts: doc.data().hearts});
                });
            } else {
                console.log('No Growls have been found!');
            }
        });
    }

    useEffect(() => {
        if (likes !== '' && likes.hearts !== []) {
            for (let i = 0; i < likes.hearts.length; i++) {
                if (likes.hearts[i] === props.current.userAt) {
                    setUserLikes(true);
                }
            }
        }
    }, [likes]);

    const replyDisplay = () => {
        if (auth.currentUser !== null) {
            if (display) {
                return setDisplay(false);
            }
            return setDisplay(true);
        }
    }

    const handleEvent = (event) => {
        event.preventDefault()
        let date = new Date().toLocaleDateString("en-US");
        console.log(event.target[0].value);
        replyMessage(event.target[0].value, props.current.userAt, date, props.id, props.userAt);
        event.target[0].value = '';
        replyDisplay();
    }

    const reply = () => {
        if (display) {
            return (
                <div className='msg-reply'>
                    <div className='msg-reply-shadow'></div>
                    <div className='msg-reply-container'>
                    <div className='msg-reply-top'>
                        <div className='msg-reply-top-cancel' onClick={() => {replyDisplay()}}>
                            <img src={close} alt='cancel'></img>
                        </div>
                        <div className='msg-reply-top-empty'></div>
                        <div className='msg-reply-top-empty2'></div>
                    </div>
                    <div className='msg-reply-middle-top'>
                        <div className='msg-reply-middle-top-img'>
                            <img src={image.image} alt='profile'></img>
                        </div>
                        <div className='msg-reply-middle-top-container'>
                            <div className='msg-reply-middle-top-names'>
                                <div className="msg-userName" >{props.name}</div>
                                <div className='msg-at'>@{props.userAt}</div>
                                <div className='msg-date'>{props.date}</div>
                            </div>
                            <div className='msg-reply-middle-top-text'>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className='msg-reply-middle-bottom'>
                            <div className='msg-reply-middle-bottom-line-container'>
                                <div className='msg-reply-middle-bottom-line'></div>
                            </div>
                            <div className='msg-reply-middle-bottom-reply'>
                                <p>Replying to</p>
                                <p style={{color: 'rgb(29, 155, 240)', fontWeight: '500'}}>@{props.userAt}</p>
                            </div>
                        </div>
                        <div className='msg-reply-bottom'>
                            <div className='msg-reply-bottom-image'>
                            <img src={image.image} alt='profile'></img>
                            </div>
                            <div className='msg-reply-bottom-form'>
                            <form onSubmit={handleEvent}>
                            <input type='text' className='content-message-input' placeholder="Growl your reply"></input>
                            <div className='msg-reply-bottom-form-submit'>
                                <input type='submit' value='Reply'></input>
                            </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

    const getReplysLength = () => {
        if (props.replys !== undefined) {
            return props.replys.length;
        }
        return 0;
    }

    const getHeartsLength = () => {
        if (likes !== '' && likes.hearts !== []) {
            return likes.hearts.length;
        }
        return 0;
    }

    const handleNavigate = () => {
        navigate(`/growl/${props.id}`);  
    }

    const handleLikes = () => {
        if (!userLikes) {
            like(props.current.userAt, props.id);
            loadHearts();
            return setUserLikes(true);
        }
        unLike(props.current.userAt, props.id);
        loadHearts();
        return setUserLikes(false);
    }

    return (
        <div className="msg-container">
                <div className='msg-container2'>
            <div className="msg-picUrl">
                <Link to={`/profile/${props.userAt}`}>
                    <img src={image.image} alt='profile'></img>
                </Link>
            </div>
            <div className="msg-subcontainer" id={props.id} onClick={handleNavigate}>
                <div className='msg-subcontainer-top'>
                    <div className="msg-userName" >{props.name}</div>
                    <div className='msg-at'>@{props.userAt}</div>
                    <div className='msg-date'>{props.date}</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
            </div>
        
            <div className='msg-sub-sub-container'>
                <div className='msg-speech-bubble'>
                <div className='msg-sub-sub-container-img' onClick={() => {replyDisplay()}}>
                    <img src={speechBubble} alt='speech bubble'></img>
                </div>
                <p>{getReplysLength()}</p>
                </div>
                <div className='msg-heart'>
                    <div className='msg-heart-container' onClick={() => {handleLikes()}}>
                        <img src={heartIMG} alt='heart'></img>
                    </div>
                    <p>{getHeartsLength()}</p>
                </div>
            </div>
            {reply()}
        </div>
    )
}

export default Message;