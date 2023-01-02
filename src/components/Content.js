import '../styles/content.css';
import checkLoggedIn from './functions/checkLoggedIn';
import getProfilePicUrl from './functions/profilePicture';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";


const Content = () => {

    const checkForUser = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return true;
            } else {
                return false;
            }
          });
    };
    const handleMessage = () => {
        if (checkForUser() || auth.currentUser !== null) {
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