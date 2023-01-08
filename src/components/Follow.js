import '../styles/message.css'
import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase-config';
import follow from './functions/follow';
import unFollow from './functions/unfollow';
import { useParams } from "react-router-dom";

const FollowContainer = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [userData, setUserData] = useState({name: '', uid: '', id: ''});
    const [counter, setCounter] = useState(0);
    const [following, setFollowing] = useState(false);
    const [followers, setFollowers] = useState(false);
    
    let { at } = useParams();

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

    // useEffect(() => {
    //     console.log(props.current.userAt);
    // }, []);

        // checks if currentUser follows profile user
    useEffect(() => {
        if ( userData.name !== '' && props.checkFor !== undefined) {
            db.collection("users")
            .where("userAt", "==", props.current.userAt)
            .get()
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        if (props.checkFor === 'followers') {
                            let dataFollowers = doc.data().followers;
                        if (dataFollowers.length > 0) {
                            for (let i = 0; i < dataFollowers.length; i++) {
                                if (dataFollowers[i] === props.userAt) {
                                    return setFollowers(true);
                                }
                            }
                        }
                        } else if (props.checkFor === 'following') {
                            let dataFollowing = doc.data().following;
                            if (dataFollowing.length > 0) {
                                for (let i = 0; i < dataFollowing.length; i++) {
                                    if (dataFollowing[i] === props.userAt) {
                                        return setFollowing(true);
                                    }
                                }
                            }
                        }
                    });
                } else {
                    console.log('users doesnt exist');
                }
            });
        }
    }, [userData]);

    const followUser = () => {
        follow(userData.id, props.userAt, props.current.userAt, props.current.id);
        setCounter(counter + 1);
        props.check();
    }

    const unFollowUser = () => {
        unFollow(userData.id, props.userAt, props.current.userAt, props.current.id);
        setCounter(counter + 1);
        props.check();
    }

    const handleButton = () => {
        if (props.checkFor === 'following') {
            if (!following) {
                return <button onClick={() => {followUser()}}>Follow</button>
            }
            return <button onClick={() => {unFollowUser()}}>Unfollow</button>
        } else if (props.checkFor === 'followers') {
            if (!followers) {
                return <button onClick={() => {followUser()}}>Follow</button>
            }
            return <button onClick={() => {unFollowUser()}}>Unfollow</button>
        }
    }

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
                {handleButton()}
            </div>
        </div>
    )
}

export default FollowContainer;