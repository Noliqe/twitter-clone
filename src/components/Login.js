import GorillaIcon from '../assets/icons8-gorilla-80.png';
import { useNavigate } from 'react-router-dom';
import signUserIn from './functions/signUserin';
import '../styles/login.css';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        signUserIn(event.target[0].value, event.target[1].value);
        event.target[0].value = ''; 
        event.target[1].value = '';


        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              // const uid = user.uid;
              // ...
              navigate('/');
            }
          });
    }

    return(
        <div className="login">
            <div className="login-container">
            <img src={GorillaIcon} style={{ maxWidth: '50px', height: 'auto'}} alt='logo'></img>
            <h2>Log in to Gorillia</h2>
            <form className='login-form' id='login-form' onSubmit={handleSubmit}>
                <label htmlFor="Email" className='labelLogin'>Email:</label><br></br>
                <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required></input><br></br>
        
                <label htmlFor="Password" className='labelLogin'>Password:</label><br></br>
                <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6'></input><br></br>
        
                <input type='submit' value='Login'></input>
                </form>
            </div>
        </div>
    )
}

export default Login