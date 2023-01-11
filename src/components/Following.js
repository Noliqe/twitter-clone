import { Link } from 'react-router-dom';
import arrow from '../assets/icons8-left-arrow-32.png';
import '../styles/following.css'
import { useParams } from "react-router-dom";
import { db } from '../config/firebase-config';
import React, { useState, useEffect } from 'react';
import FollowContainer from './Follow';

const Following = (props) => {
    const [userData, setUserData] = useState({name: '', uid: '', date: '', id: '', following: [], followers: []});
    const [userId, setUserId] = useState('');
    const [checkFollowing, setCheckFollowing] = useState(0);

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

            // get all data again
            useEffect(() => {
                if (checkFollowing > 0) {
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
                }
            }, [checkFollowing]);
    
        // checkFollowers +1 so useEffects kicks in
        const checkForFollowing = () => {
           return setCheckFollowing(checkFollowing + 1);
        }


    const handleFollowing = () => {
        if (userId !== 404 && userData.uid !== '' && userData.following.length > 0) {
            let arr = [];
            for (let i = 0; i < userData.following.length; i++) {
                arr.push(
                    <FollowContainer 
                    key={i}
                    userAt={userData.following[i]}
                    uid={userData.uid}
                    current={props.current}
                    check={checkForFollowing}
                    checkFor={'following'}/>
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
        <div className="following">
            <div className="following-topbar">
            <Link to={`/profile/${at}`}>
                <img src={arrow} alt="arrow"></img>
            </Link>
                <div className="following-topbar-container">
                    <p style={{fontWeight: '700'}}>{props.current.name}</p>
                    <p>@{at}</p>
                </div>
            </div>
            <div className='following-div-btns'>
                <Link to={`/profile/${at}/followers`}>
                <div className='following-followers'>
                    <p>Followers</p>
                </div>
                </Link>
                <Link to={`/profile/${at}/following`}>
                <div className='following-following'>
                    <p>Following</p>
                    <div className='following-underline'></div>
                </div>
                </Link>
            </div>
            <div className='following-container'>
                {handleFollowing()}
            </div>
        </div>
    )
}

export default Following;