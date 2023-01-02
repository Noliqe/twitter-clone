import '../styles/content.css';
import checkLoggedIn from './functions/checkLoggedIn';
import React, { useState, useEffect } from 'react';
import getProfilePicUrl from './functions/profilePicture';

const Content = () => {
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        if (checkLoggedIn) {
            if (display === 'none') {
                setDisplay('flex');
            }
        }
    }, []);

    const handleMessage = () => {
        if (checkLoggedIn) {
            return (
                <div className='content-message'>
                    <h2>Home</h2>
                    <div className='content-message-container'>
                        <div className='content-profile-picture'>
                            <img src={getProfilePicUrl()} alt='profile'></img>
                        </div>
                        <form>
                        <input type='text' className='content-message-input' placeholder="What's happening?"></input>
                        <input type='submit'></input>
                        </form>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="Content">
            {handleMessage()}
        </div>
    )
}

export default Content;