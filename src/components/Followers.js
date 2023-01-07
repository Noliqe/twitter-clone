import { Link } from 'react-router-dom';
import arrow from '../assets/icons8-left-arrow-32.png';
import '../styles/followers.css'
import { useParams } from "react-router-dom";
import '../styles/followContainer.css';
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';
import FollowContainer from './Follow';

const Followers = (props) => {
    const [userData, setUserData] = useState({name: '', uid: '', date: '', id: '', following: [], followers: []});
    const [userId, setUserId] = useState('');

    let { at } = useParams();

    // get all data from database of profile user and set as object
    useEffect(() => {
        db.collection("users")
        .where("userAt", "==", at)
        .get()
        .then((snapshot) => {
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    setUserId(doc.id);
                    setUserData(prev =>({...prev, 
                    name: doc.data().name,
                    uid: doc.data().uid,
                    date: doc.data().timestamp,
                    id: doc.id,
                    following: doc.data().following,
                    followers: doc.data().followers}));
                });
            } else {
                console.log('users doesnt exist');
                setUserId(404);
            }
        });
    }, []);

    const handleFollowers = () => {
        if (userId !== 404 && userData.uid !== '' && userData.followers.length > 0) {
            let arr = [];
            for (let i = 0; i < userData.followers.length; i++) {
                arr.push(
                    <FollowContainer 
                    key={i}
                    userAt={userData.followers[i]}
                    uid={userData.uid}/>
                )
            }
            return (
                <div className='following-users'>
                    {arr}
                </div>
            )
        }
    }

    return (
        <div className="followers">
            <div className="followers-topbar">
            <Link to={`/profile/${at}`}>
                <img src={arrow} alt="arrow"></img>
            </Link>
                <div className="followers-topbar-container">
                    <p style={{fontWeight: '700'}}>{props.current.name}</p>
                    <p>@{props.current.userAt}</p>
                </div>
            </div>
            <div className='followers-div-btns'>
                <Link to={`/profile/${at}/followers`}>
                <div className='followers-followers'>
                    <p>Followers</p>
                    <div className='followers-underline'></div>
                </div>
                </Link>
                <Link to={`/profile/${at}/following`}>
                <div className='followers-following'>
                    <p>Following</p>
                </div>
                </Link>
            </div>
            <div className='following-container'>
                {handleFollowers()}
            </div>
        </div>
    )
}

export default Followers;