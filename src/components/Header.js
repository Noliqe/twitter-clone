import '../styles/header.css';
import { Link } from 'react-router-dom';
import GorillaIcon from '../assets/icons8-gorilla-80.png';
import HomeIcon from '../assets/icons8-home-page-64.png';
import hashtagIcon from '../assets/icons8-hashtag-50.png';
import ProfileIcon from '../assets/icons8-customer-50.png';
import Dots from '../assets/icons8-ellipsis-50.png';
import ArrowDown from '../assets/icons8-sort-down-48.png';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase-config';

const Header = (props) => {
    const [display, setDisplay] = useState('none');
    const [popUpDisplay, setPopUpDisplay] = useState('none');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (display === 'flex' && !props.loggedIn) {
            return setDisplay('none');
        }
    }, [props.loggedIn]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(prev =>({...prev, name: auth.currentUser.displayName}));
                if (display === 'none') {
                    return setDisplay('flex');
                }
            }
          });
    }, []);
 
    const showProfilePopUp = () => {
        if (popUpDisplay === 'none') {
            return setPopUpDisplay('block');
        }
        return setPopUpDisplay('none');
    }

    const handleRender = () => {
        if (props.loggedIn) {
            return (
                <div className="header-profile">
                    <div className='profile-popup' style={{ display: popUpDisplay}}>
                    <div className='seperator'></div>
                    <img src={ArrowDown} alt='arrow'></img>
                    <div className='profile-logout'>
                    <Link to='/logout'>
                        <p>{`Log out @${props.data.userAt}`}</p>
                    </Link>
                    </div>
                </div>
                <button className='header-user' onClick={() => {showProfilePopUp()}}>
                    <div className='header-profile-picture'>
                    <img src={props.data.image} alt='profile'></img>
                    </div>
                    <div className='header-userName'>
                        <p style={{ fontWeight: '700'}}>{userData.name}</p>
                        <p>{`@${props.data.userAt}`}</p>
                    </div>
                    <img src={Dots} alt='dots'></img>
                </button>
            </div>
            )
        }
    }

return (
    <div className="header">
    <div className='header-list'>
    <ul>
        <Link to='/'>
            <img src={GorillaIcon} style={{ maxWidth: '50px', height: 'auto'}} alt='logo'></img>
        </Link>
        <Link to='/'>
        <li style={{ display: display}}>
            <img src={HomeIcon} alt='Home'></img>
            <p>Home</p>
        </li>
        </Link>
        <Link to='/explore'>
        <li>
            <img src={hashtagIcon} alt='Explore'></img>
            <p>Explore</p>
        </li>
        </Link>
        <Link to={`/profile/${props.data.userAt}`}>
        <li style={{ display: display}}>
                <img src={ProfileIcon} alt='Profile'></img>
                <p>Profile</p>
        </li>
        </Link>
        <button>Growl</button>
    </ul>
    </div>
    {handleRender()}
</div>
)
}

export default Header;