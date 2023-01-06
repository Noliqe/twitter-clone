import {
    useParams
} from "react-router-dom";
import "../styles/profile.css"
import arrow from '../assets/icons8-left-arrow-32.png';
import calendar from '../assets/icons8-calendar-32.png';
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from "../config/firebase-config";

const Profile = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [backgroundImage, setBackgroundImage] = useState('');
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({name: '', uid: '', date: ''});
    const [user, setUser] = useState(false);
    // users At
    let { at } = useParams();

    useEffect(() => {
        getUserData()
    }, []);

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
        if (at === props.data.userAt) {
            setUser(true);
        }
    }, []);

    const getUserData = () => {
        db.collection("users")
        .where("userAt", "==", at)
        .get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    console.log('found user');
                    setUserId(doc.id);
                    setUserData(prev =>({...prev, 
                    name: doc.data().name,
                    uid: doc.data().uid,
                    date: doc.data().timestamp}));
                });
            } else {
                console.log('users doesnt exist');
                setUserId(404);
            }
        });
    }

    const handlebackgroundImage = () => {
        if (backgroundImage === '') {
            return (
                <div className="profile-background-no-img"></div>
            )
        }
        return (
            <img src={backgroundImage} alt="background"></img>
        )
    }

    const handleEditRender = () => {
        if (user) {
            return <button>Edit profile</button>
        }
    }

    const handleRender = () => {
        if (userId === 404) {
            return (
                <div className="profile-container">
            <div className="profile-topbar">
            <img src={arrow} alt="arrow"></img>
                <div className="profile-topbar-container">
                    <p>Profile</p>
                </div>
            </div>
            <div className="profile-background-img">
                {handlebackgroundImage()}
            </div>
            <div className="profile-info">
                <div className="profile-info-top-svg">
                <svg>
            <circle cx="50" cy="50" r="40" stroke="wheat" strokeWidth="3" fill="grey" />
            </svg> 
                </div>
                <p>{at}</p>
                <div className="profile-doesnt-exist">
                    <h1>This account doesn’t exist</h1>
                    <p>Try searching for another.</p>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="profile-container">
            <div className="profile-topbar">
                <img src={arrow} alt="arrow"></img>
                <div className="profile-topbar-container">
                    <p style={{fontWeight: '700'}}>{userData.name}</p>
                    <p>0 tweets</p>
                </div>
            </div>
            <div className="profile-background-img">
                {handlebackgroundImage()}
            </div>
            <div className="profile-info">
                <div className="profile-info-top">
                    <img src={image.image} alt="profile"></img>
                    {handleEditRender()}
                </div>
                <p style={{marginBottom: '0px', fontWeight: '700'}}>{userData.name}</p>
                <p style={{marginTop: '0px', color: 'grey'}}>@{at}</p>
                <div className="profile-info-joined">
                    <img src={calendar} alt='calendar'></img>
                    <p style={{color: 'grey'}}>Joined {userData.date}</p>
                </div>
                <div className="profile-info-follow">
                    <div className="profile-info-following">
                        <p style={{fontSize: '14px'}}>1</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Following</p>
                    </div>
                    <div className="profile-info-followers">
                        <p style={{fontSize: '14px'}}>0</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Followers</p>
                    </div>
                </div>
                <div className="profile-links">
            <ul>
                <li>
                    <p>Tweets</p>
                </li>
                <li>
                    <p>Tweets & replies</p>
                </li>
                <li>
                    <p>Media</p>
                </li>
                <li>
                    <p>Likes</p>
                </li>
            </ul>
            </div>
            </div>

        </div>
    )
        
    }


    return (
        <div className="profile">
            {handleRender()}
        </div>
    );
}

export default Profile;