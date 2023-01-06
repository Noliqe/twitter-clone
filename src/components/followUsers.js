import '../styles/followUsers.css'
import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';
import { Link } from 'react-router-dom';

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
                    <Link to={`/profile/${props.userAt}`}>
                        <img src={image.image} alt='profile'></img>
                    </Link>
                    <div className='followUser-sub-container'>
                        <div className='followUser-sub-container-names'>
                            <p>{props.name}</p>
                            <p style={{color: 'grey'}}>@{props.userAt}</p>
                        </div>
                        <button>Follow</button>
                    </div>
                    </li>
                </ul>
        </div>
    )
}

export default FollowUsers;