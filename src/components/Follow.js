import '../styles/message.css'
import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase-config';

const FollowContainer = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [userData, setUserData] = useState({name: '', uid: '', id: ''});

    useEffect(() => {
        if (userData.uid !== '') {
            storage
            .ref(`profile-pictures/${userData.uid}`)
            .getDownloadURL()
            .then((url) => {
                setImage(prev =>({...prev, image: url}));
            })
            .catch(() => {
              setImage(prev =>({...prev, image: 'https://www.w3schools.com/howto/img_avatar.png'}));
            });
        }
    }, [userData]);

    useEffect(() => {
        db.collection("users")
        .where("userAt", "==", props.userAt)
        .get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    setUserData(prev =>({...prev, 
                    name: doc.data().name,
                    uid: doc.data().uid,
                    id: doc.id,}));
                });
            } else {
                console.log('users doesnt exist');
            }
        });
    }, []);

    return (
        <div className="followContainer">
            <div className='followContainer-subContainer'>
            <div className="followContainer-picUrl">
                <Link to={`/profile/${props.userAt}`}>
                    <img src={image.image} alt='profile'></img>
                </Link>
            </div>
            <div className='followContainer-names'>
                <p>{userData.name}</p>
                <p style={{color: 'grey'}}>@{props.userAt}</p>
            </div>
            </div>
            <div className='followContainer-button'>
                <button>Following</button>
            </div>
        </div>
    )
}

export default FollowContainer;