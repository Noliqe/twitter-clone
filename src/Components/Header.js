import './Style.css';
import { Link } from 'react-router-dom';
import GorillaIcon from './Images/icons8-gorilla-80.png';
import HomeIcon from './Images/icons8-home-page-64.png';
import hashtagIcon from './Images/icons8-hashtag-50.png';
import ProfileIcon from './Images/icons8-customer-50.png';
import React, { useState, useEffect } from 'react';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false); // temp
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        if (loggedIn) {
            if (display === 'none') {
                setDisplay('block');
            }
        }
      }, [loggedIn]);

return (
    <div className="header">
    <div className='header-filling'></div>
    <div className='header-list'>
    <ul>
        <Link to='/'>
            <img src={GorillaIcon} style={{ maxWidth: '50px', height: 'auto'}} alt='logo'></img>
        </Link>
        <li style={{ display: display}}>
            <img src={HomeIcon} alt='Home'></img>
            <p>Home</p>
        </li>
        <li>
            <img src={hashtagIcon} alt='Explore'></img>
            <p>Explore</p>
        </li>
        <li style={{ display: display}}>
            <img src={ProfileIcon} alt='Profile'></img>
            <p>Profile</p>
        </li>
    </ul>
    </div>
</div>
)
}

export default Header;