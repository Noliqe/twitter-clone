import './Style.css';
import { Link } from 'react-router-dom';
import GorillaIcon from './Images/icons8-gorilla-80.png';
import HomeIcon from './Images/icons8-home-page-64.png';
import hashtagIcon from './Images/icons8-hashtag-50.png';
import ProfileIcon from './Images/icons8-customer-50.png';
import Dots from './Images/icons8-ellipsis-50.png';
import ArrowDown from './Images/icons8-sort-down-48.png';
import React, { useState, useEffect } from 'react';

const Header = (props) => {
    const [display, setDisplay] = useState('none');
    const [popUpDisplay, setPopUpDisplay] = useState('none');

    useEffect(() => {
        if (props.user !== undefined) {
            if (display === 'none') {
                setDisplay('flex');
            }
        }
    }, []);
        
    const showProfilePopUp = () => {
        if (popUpDisplay === 'none') {
            return setPopUpDisplay('block');
        }
        return setPopUpDisplay('none');
    }

    const handleRender = () => {
        if (props.user !== undefined) {
            return (
                <div className="header">
                    <div className='profile-popup' style={{ display: popUpDisplay}}>
                    <div className='seperator'></div>
                    <img src={ArrowDown} alt='arrow'></img>
                    <div className='profile-logout'>
                    <Link to='/logout'>
                        <p>Log out @Name</p>
                    </Link>
                    </div>
                </div>
                <button className='header-user' onClick={() => {showProfilePopUp()}}>
                    <div className='header-profile-picture'>
                    <img src={props.profilePicture()} alt='profile'></img>
                    </div>
                    <div className='header-userName'>
                        <p style={{ fontWeight: '700'}}>Name</p>
                        <p>@Name</p>
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
        <li style={{ display: display}}>
            <img src={HomeIcon} alt='Home'></img>
            <p>Home</p>
        </li>
        <li>
            <img src={hashtagIcon} alt='Explore'></img>
            <p>Explore</p>
        </li>
        <li style={{ display: display}}>
        {/* Should be username link */}
            {/* <Link to={props.user}> */}
                <img src={ProfileIcon} alt='Profile'></img>
                <p>Profile</p>
            {/* </Link> */}
        </li>
    </ul>
    </div>
    {handleRender()}
</div>
)
}

export default Header;