import GorillaIcon from '../assets/icons8-gorilla-80.png';
import { useNavigate } from 'react-router-dom';
import signUserOut from './functions/signUserOut';

const Logout = (props) => {
    const navigate = useNavigate();

    

    return(
        <div className="logout">
            <div className="logout-container">
            <img src={GorillaIcon} style={{ maxWidth: '50px', height: 'auto'}} alt='logo'></img>
            <h2>Log out of Gorillia?</h2>
            <p>You can always log back in at any time. If you want to switch accounts, you can do that by adding an existing account.</p>
            <button onClick={() => {signUserOut(); navigate('/');}}>Log out</button>
            <button onClick={() => {navigate('/')}}>Cancel</button>
            </div>
        </div>
    )
}

export default Logout