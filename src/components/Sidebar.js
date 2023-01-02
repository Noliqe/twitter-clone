import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import getProfilePicUrl from './functions/profilePicture';
import checkLoggedIn from './functions/checkLoggedIn';

const Sidebar = (props) => {

    const handleContent = () => {
        if (!checkLoggedIn) {
            return (
                <div className='sidebar-login'>
                    <h2>New to Gorillia?</h2>
                    <p>Sign up now to get your own personalized timeline!</p>
                    <button>Sign up with google</button>
                    <Link to='/signup'>
                    <button>Sign up with email</button>
                    </Link>
                    <div className='footer-login'>
                    <div className='footer-login-filling'></div>
                        <div className='footer-login-container'>
                        <div className='footer-login-text'>
                        <h3>Don't miss what's happening</h3>
                        <h4>People on Gorillia are the first to know.</h4>
                        </div>
                    <div className='footer-buttons'>
                        <button className='footer-login-btn'>Log in</button>
                        <Link to='/signup'>
                        <button className='footer-signup-btn'>Sign up</button>
                        </Link>
                    </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='sidebar-follow'>
                <h2>Who to follow</h2>
                <ul>
                    <li>
                        <img src={getProfilePicUrl()} alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img src={getProfilePicUrl()} alt='profile'></img>
                        <p>Name</p>
                        <button>Follow</button>
                    </li>
                    <li>
                        <img src={getProfilePicUrl()} alt='profile'></img>
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