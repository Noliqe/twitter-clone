import './Style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

    const handleContent = () => {
        if (props.user === null) {
            return (
                <div className='sidebar-login'>
                    <h2>New to Gorillia?</h2>
                    <p>Sign up now to get your own personalized timeline!</p>
                    <button>Sign up with google</button>
                    <Link to='/signup'>
                    <button>Sign up with email</button>
                    </Link>
                </div>
            )
        }
        return (
            <div className='sidebar-follow'>
                <h2>Who to follow</h2>
                <ul>
                    <li>
                        <img src={props.profilePicture()} alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img src={props.profilePicture()} alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img src={props.profilePicture()} alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                </ul>
            </div>
        )
}




return (
    <div className="sidebar">
        {handleContent()}
</div>
)
}
    
export default Sidebar;