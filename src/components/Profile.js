import {
    useParams
} from "react-router-dom";
import "../styles/profile.css"
import arrow from '../assets/icons8-left-arrow-32.png';
import calendar from '../assets/icons8-calendar-32.png';
import React, { useState, useEffect } from 'react';
import { db, storage, dbfirestore } from "../config/firebase-config";
import Message from "./Message";
import { Link } from 'react-router-dom';
import doesNotExist from "./404Profile";

const Profile = (props) => {
    const [image, setImage] = useState({image: 'https://www.google.com/images/spin-32.gif?a'});
    const [backgroundImage, setBackgroundImage] = useState('');
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({name: '', uid: '', date: '', id: '', following: [], followers: []});
    const [user, setUser] = useState(false);
    const [growls, setGrowls] = useState('');
    const [selected, setSelected] = useState({
        first: { li: 'solid 4px lightgreen', p: 'lightgreen'},
        second: { li: 'solid 0px lightgreen', p: 'grey'},
        third: {li: 'solid 0px lightgreen', p: 'grey'},
        fourth: {li: 'solid 0px lightgreen',p: 'grey'},
    })
    // users At
    let { at } = useParams();

    useEffect(() => {
        getUserData();
        getUserGrowls();
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

    useEffect(() => {
        console.log(growls);
    }, [growls]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

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

    // useEffect(() => {
    //     if (userData.id !== '') {

    //     }
    // }, [userData]);

//     useEffect(() => {
//         db
//         .collection("users")
//         .get()
//         .then((snapshot) => {
//             if (snapshot.size > 0) {
//                 snapshot.forEach((doc) => {
//                     console.log(doc.data().followers)
//                 })
//             }
//         })
// }, []);

// useEffect(() => {
//     const usersRef = db.collection('users').doc('uwSJ9FeyTMlN3Ge2nBrE');

// // Atomically add a new region to the "regions" array field.
// usersRef.update({
//     following: dbfirestore.FieldValue.arrayUnion('greater_virginia')
//   });

//         // Atomically remove a region from the "regions" array field.
//         usersRef.update({
//             following: dbfirestore.FieldValue.arrayRemove("east_coast")
//           });

// }, []);


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
        return <button>Follow</button>
    }

    const getUserGrowls = () => {
        db.collection("messages")
        .where("userAt", "==", at)
        .get()
        .then((snapshot) => {
            let arr = [];
            if (snapshot.size > 0) {
                snapshot.forEach((doc) => {
                    arr.push({
                        text: doc.data().text,
                        date: doc.data().timestamp});
                });
            } else {
                console.log('No Growls have been found!');
            }
            setGrowls(arr);
        });
    }

    const handleMessages = () => {
        if (growls !== '' && userData.name !== '') {
            let arr = [];
            for (let i = 0; i < growls.length; i++) {
                arr.push(
                    <Message 
                    key={i}
                    date={growls[i].date}
                    name={userData.name}
                    text={growls[i].text}
                    userAt={at}
                    imagePath={userData.uid}/>
                )
            }
            return (
                <div className='msg'>
                    {arr}
                </div>
            )
        }
    }

    const changeStyle = (item) => {
        if (item === 'first') {
            setSelected({
                first: { li: 'solid 4px lightgreen', p: 'lightgreen'},
                second: { li: 'solid 0px lightgreen', p: 'grey'},
                third: {li: 'solid 0px lightgreen', p: 'grey'},
                fourth: {li: 'solid 0px lightgreen',p: 'grey'},
            })
        } else if (item === 'second') {
            setSelected({
                first: { li: 'solid 0px lightgreen', p: 'grey'},
                second: { li: 'solid 4px lightgreen', p: 'lightgreen'},
                third: {li: 'solid 0px lightgreen', p: 'grey'},
                fourth: {li: 'solid 0px lightgreen',p: 'grey'},
            })
    } else if (item === 'third') {
        setSelected({
            first: { li: 'solid 0px lightgreen', p: 'grey'},
            second: { li: 'solid 0px lightgreen', p: 'grey'},
            third: {li: 'solid 4px lightgreen', p: 'lightgreen'},
            fourth: {li: 'solid 0px lightgreen',p: 'grey'},
        })
    } else if (item === 'fourth') {
            setSelected({
                first: { li: 'solid 0px lightgreen', p: 'grey'},
                second: { li: 'solid 0px lightgreen', p: 'grey'},
                third: {li: 'solid 0px lightgreen', p: 'grey'},
                fourth: {li: 'solid 4px lightgreen',p: 'lightgreen'},
            })
    }
}

    const handleRender = () => {
        if (userId === 404) {
            return <doesNotExist at={at}/>
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
                    <div className="profile-info-following">
                        <p style={{fontSize: '14px'}}>{userData.following.length}</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Following</p>
                    </div>
                    <div className="profile-info-followers">
                        <p style={{fontSize: '14px'}}>{userData.followers.length}</p>
                        <p style={{color: 'grey', fontSize: '14px'}}>Followers</p>
                    </div>
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
        </div>
    );
}

export default Profile;