import './Style.css';
import { Link } from 'react-router-dom';
import GorillaIcon from './Images/icons8-gorilla-80.png';
import HomeIcon from './Images/icons8-home-page-64.png';
import hashtagIcon from './Images/icons8-hashtag-50.png';
import ProfileIcon from './Images/icons8-customer-50.png';
import Dots from './Images/icons8-ellipsis-50.png';
import React, { useState, useEffect } from 'react';

const Header = (props) => {
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        if (props.user !== null) {
            if (display === 'none') {
                setDisplay('flex');
            }
        }
      }, []);

return (
    <div className="header">
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
    <button className='header-user'>
        <div className='header-profile-picture'>
        <img src={props.profilePicture()} alt='profile'></img>
        </div>
            <div className='header-userName'>
                <p>Name</p>
                <p>@Name</p>
            </div>
        <img src={Dots} alt='dots'></img>
    </button>
</div>
)
}

export default Header;