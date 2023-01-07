import '../styles/followUsers.css'
import React, { useState, useEffect } from 'react';
import { storage, db } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import follow from './functions/follow';
import unFollow from './functions/unfollow';

const FollowUsers = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [user, setUser] = useState(false);
    const [counter, setCounter] = useState(0);

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

    useEffect(() => {
        if (props.current.userAt !== undefined) {
            db.collection("users")
            .where("userAt", "==", props.current.userAt)
            .get()
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        let following = doc.data().following;
                        if (following.length > 0) {
                            for (let i = 0; i < following.length; i++) {
                                if (following[i] === props.userAt) {
                                    return setUser(true);
                                }
                            }
                        }
                    });
                } else {
                    console.log('users doesnt exist');
                }
            }); 
        }
    }, [props.current.userAt]);

    useEffect(() => {
        if (counter > 0) {
            db.collection("users")
            .where("userAt", "==", props.current.userAt)
            .get()
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        let following = doc.data().following;
                        if (following.length > 0) {
                            for (let i = 0; i < following.length; i++) {
                                if (following[i] === props.userAt) {
                                    return setUser(true);
                                }
                            }
                        }
                        if (user) {
                            return setUser(false);
                        }
                    });
                } else {
                    if (user) {
                        return setUser(false);
                    }
                }
            });
        }
    }, [counter]);



    const followUser = () => {
        follow(props.id, props.userAt, props.current.userAt, props.current.id);
        setCounter(counter + 1);
    }

    const unFollowUser = () => {
        unFollow(props.id, props.userAt, props.current.userAt, props.current.id);
        setCounter(counter + 1);
    }

    const handleBtn = () => {
        if (!user) {
            return <button onClick={() => {followUser()}}>Follow</button>
        }
        return <button onClick={() => {unFollowUser()}}>Unfollow</button>
    }

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
                        {handleBtn()}
                    </div>
                    </li>
                </ul>
        </div>
    )
}

export default FollowUsers;