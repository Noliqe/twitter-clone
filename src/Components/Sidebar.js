import './Style.css';
import React, { useState } from 'react';

const Sidebar = () => {
    const [loggedIn, setLoggedIn] = useState(false); // temp

    const handleContent = () => {
        if (!loggedIn) {
            return (
                <div className='sidebar-login'>
                    <h2>New to Gorillia?</h2>
                    <p>Sign up now to get your own personalized timeline!</p>
                    <button>Sign up with google</button>
                    <button>Sign up with email</button>
                </div>
            )
        }
        return (
            <div className='sidebar-follow'>
                <h2>Who to follow</h2>
                <ul>
                    <li>
                        <img alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img alt='profile'></img>
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