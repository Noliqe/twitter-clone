import { useParams } from "react-router-dom";
import "../styles/profile.css"
import arrow from '../assets/icons8-left-arrow-32.png';
import calendar from '../assets/icons8-calendar-32.png';
import React, { useState, useEffect } from 'react';
import { db, storage } from "../config/firebase-config";
import Message from "./Message";
import { Link } from 'react-router-dom';
import DoesNotExist from "./404Profile";
import follow from "./functions/follow";
import unFollow from "./functions/unfollow";
import ReplyMessages from "./ReplyMessages";

const Profile = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [backgroundImage, setBackgroundImage] = useState('');
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({name: '', uid: '', date: '', id: '', following: [], followers: []});
    const [user, setUser] = useState(false);
    const [growls, setGrowls] = useState('');
    const [selected, setSelected] = useState({
        first: { li: 'solid 4px lightgreen', p: 'lightgreen', active: true},
        second: { li: 'solid 0px lightgreen', p: 'grey', active: false},
        third: {li: 'solid 0px lightgreen', p: 'grey', active: false},
        fourth: {li: 'solid 0px lightgreen',p: 'grey', active: false},
    })
    const [following, setFollowing] = useState(false);
    const [counter, setCounter] = useState(0);
    const [counterHearts, setCounterHearts] = useState(0);
    const [replys, setReplys] = useState('');

    // users At
    let { at } = useParams();

    useEffect(() => {
        getUserData();
        getUserGrowls();
        getUserReplys();
    }, []);


    // checks if currentUser follows profile user
    useEffect(() => {
        if (userId !== 404 && userId !== '') {
            db.collection("users")
            .where("userAt", "==", props.current.userAt)
            .get()
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        let following = doc.data().following;
                        if (following.length > 0) {
                            for (let i = 0; i < following.length; i++) {
                                if (following[i] === at) {
                                    return setFollowing(true);
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

    // check again if following on follow/unfollow btn press
    useEffect(() => {
        if (counter > 0) {
            db.collection("users")
            .where("userAt", "==", props.current.userAt)
            .get()
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        let followingData = doc.data().following;
                        if (followingData.length > 0) {
                            for (let i = 0; i < followingData.length; i++) {
                                if (followingData[i] === at) {
                                    return setFollowing(true);
                                }
                            }
                            if (following) {
                                return setFollowing(false);
                            }
                        } else {
                            if (following) {
                                return setFollowing(false);
                            }
                        }
                    });
                } else {
                    console.log('user doesnt exist!');
                }
            });
        }
    }, [counter]);

    //load profile image
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

    // if user checks his own profile, set true
    useEffect(() => {
        if (at === props.current.userAt) {
            setUser(true);
        }
    }, []);

    // get all data from database of profile user and set as object
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

    // run again
    useEffect(() => {
        if (counterHearts > 0) {
            db.collection("messages")
            .where("userAt", "==", at)
            .where("isReply", "==", false)
            .orderBy('timestamp', 'desc')
            .get()
            .then((snapshot) => {
                let arr = [];
                if (snapshot.size > 0) {
                    snapshot.forEach((doc) => {
                        arr.push({
                            text: doc.data().text,
                            date: doc.data().date,
                            replys: doc.data().replys,
                            id: doc.id,
                            hearts: doc.data().hearts});
                    });
                } else {
                    console.log('No Growls have been found!');
                }
                setGrowls(arr);
            });
        }
    }, [counterHearts]);

    const updateCounterHearts = () => {
        return setCounterHearts(counterHearts +1);
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
        if (following) {
            return <button onClick={() => {unFollowUser()}}>Unfollow</button>  
        }
        return <button onClick={() => {followUser()}}>Follow</button>
    }

    const followUser = () => {
        follow(userData.id, at, props.current.userAt, props.current.id);
        setCounter(counter + 1);
    }

    const unFollowUser = () => {
        unFollow(userData.id, at, props.current.userAt, props.current.id);
        setCounter(counter + 1);
    }

    // get all messages that user has posted
    const getUserGrowls = () => {
        db.collection("messages")
        .where("userAt", "==", at)
        .where("isReply", "==", false)
        .orderBy('timestamp', 'desc')
        .get()
        .then((snapshot) => {
            let arr = [];
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    arr.push({
                        text: doc.data().text,
                        date: doc.data().date,
                        replys: doc.data().replys,
                        id: doc.id,});
                });
            } else {
                console.log('No Growls have been found!');
            }
            setGrowls(arr);
        });
    }

    // get all replys that user has posted
    const getUserReplys = () => {
        db.collection("messages")
        .where("userAt", "==", at)
        .where("isReply", "==", true)
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
                            messageId: doc.data().replyId});
                });
            } else {
                console.log('No Growls have been found!');
            }
            setReplys(arr);
        });
    }

    // create messages
    const handleMessages = () => {
        if (growls !== '' && userData.name !== '' && selected.first.active) {
            let arr = [];
            for (let i = 0; i < growls.length; i++) {
                arr.push(
                    <Message 
                    key={i}
                    id={growls[i].id}
                    date={growls[i].date}
                    name={userData.name}
                    text={growls[i].text}
                    userAt={at}
                    imagePath={userData.uid}
                    replys={growls[i].replys}
                    current={props.current}
                    hearts={growls[i].hearts}
                    loggedIn={props.loggedIn}
                    counter={updateCounterHearts}
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

    // create replys
    const handleReplys = () => {
        if (selected.second.active && replys !== '') {
            let arr = [];
            for (let i = 0; i < replys.length; i++) {
                if (replys.length > 0) {
                    arr.push(
                    <ReplyMessages
                    key={i}
                    date={replys[i].date}
                    name={replys[i].name}
                    text={replys[i].text}
                    userAt={replys[i].userAt}
                    imagePath={replys[i].uid}
                    current={props.current}
                    messageId={replys[i].messageId}/>
                    )
                }
            }
            return <div className="replys">
                {arr}
            </div>
        }
    }

    const changeStyle = (item) => {
        if (item === 'first') {
            setSelected({
                first: { li: 'solid 4px lightgreen', p: 'lightgreen', active: true},
                second: { li: 'solid 0px lightgreen', p: 'grey', active: false},
                third: {li: 'solid 0px lightgreen', p: 'grey', active: false},
                fourth: {li: 'solid 0px lightgreen',p: 'grey', active: false},
            })
        } else if (item === 'second') {
            setSelected({
                first: { li: 'solid 0px lightgreen', p: 'grey', active: false},
                second: { li: 'solid 4px lightgreen', p: 'lightgreen', active: true},
                third: {li: 'solid 0px lightgreen', p: 'grey', active: false},
                fourth: {li: 'solid 0px lightgreen',p: 'grey', active: false},
            })
    } else if (item === 'third') {
        setSelected({
            first: { li: 'solid 0px lightgreen', p: 'grey', active: false},
            second: { li: 'solid 0px lightgreen', p: 'grey', active: false},
            third: {li: 'solid 4px lightgreen', p: 'lightgreen', active: true},
            fourth: {li: 'solid 0px lightgreen',p: 'grey', active: false},
        })
    } else if (item === 'fourth') {
            setSelected({
                first: { li: 'solid 0px lightgreen', p: 'grey', active: false},
                second: { li: 'solid 0px lightgreen', p: 'grey', active: false},
                third: {li: 'solid 0px lightgreen', p: 'grey', active: false},
                fourth: {li: 'solid 4px lightgreen',p: 'lightgreen', active: true},
            })
    }
}

    const handleRender = () => {
        if (userId === 404) {
            return <DoesNotExist at={at}/>
    }
    return (
        <div className="profile-container">
            <div className="profile-topbar">
            <Link to='/'>
                <img src={arrow} alt="arrow"></img>
            </Link>
                <div className="profile-topbar-container">
                    <p style={{fontWeight: '700'}}>{userData.name}</p>
                    <p>{growls.length} tweets</p>
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
                <Link to={`/profile/${at}/following`}>
                    <div className="profile-info-following">
                        <p style={{fontSize: '14px', color: 'black'}}>{userData.following.length}</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Following</p>
                    </div>
                    </Link>
                    <Link to={`/profile/${at}/followers`}>
                    <div className="profile-info-followers">
                        <p style={{fontSize: '14px', color: 'black'}}>{userData.followers.length}</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Followers</p>
                    </div>
                    </Link>
                </div>
                <div className="profile-links">
            <ul>
                <li style={{borderBottom: selected.first.li}} onClick={() => {changeStyle('first')}}>
                    <p style={{color: selected.first.p}}>Tweets</p>
                </li>
                <li style={{borderBottom: selected.second.li}} onClick={() => {changeStyle('second')}}>
                    <p style={{color: selected.second.p}}>Tweets & replies</p>
                </li>
                <li style={{borderBottom: selected.third.li}} onClick={() => {changeStyle('third')}}>
                    <p style={{color: selected.third.p}}>Media</p>
                </li>
                <li style={{borderBottom: selected.fourth.li}} onClick={() => {changeStyle('fourth')}}>
                    <p style={{color: selected.fourth.p}}>Likes</p>
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
            {handleMessages()}
            {handleReplys()}
        </div>
    );
}

export default Profile;