import '../styles/sidebar.css'
import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';

const FollowUsers = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});

    useEffect(() => {
        storage
        .ref(`profile-pictures/${props.imagePath}`)
        .getDownloadURL()
        .then((url) => {
            setImage(prev =>({...prev, image: url}));
        })
        .catch(() => {
            console.log('No image found, set standard image!')
          setImage(prev =>({...prev, image: 'https://www.w3schools.com/howto/img_avatar.png'}));
        });
    }, []);

    return (
        <div className="followUser-container">
                <ul>
                    <li>
                        <img src={image.image} alt='profile'></img>
                        <p>{props.userAt}</p>
                        <button>Follow</button>
                    </li>
                </ul>
        </div>
    )
}

export default FollowUsers;