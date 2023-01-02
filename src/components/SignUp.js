import createUser from './functions/createUser';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        createUser(event.target[0].value, event.target[1].value);
        event.target[0].value = ''; 
        event.target[1].value = '';
        navigate('/');
    }

    return (
        <div className="signup">
            <div className='signup-container' id='signup-container'>
            <h2>Create your account</h2>
    <form className='signup-form' id='signup-form' onSubmit={handleSubmit}>
        <label htmlFor="Email" className='labelSignUp'>Email:</label><br></br>
        <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required></input><br></br>

        <label htmlFor="Password" className='labelSignUp'>Password:</label><br></br>
        <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6'></input><br></br>

        <input type='submit' value='Register'></input>
        </form>
    </div>
</div>
    )
}

export default Signup