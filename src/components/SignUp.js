import createUser from './functions/createUser';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase-config';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Signup = (props) => {
    const [usersAt, setUsersAt] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
		let tempArr = [];
		db.collection("users")
			.get()
			.then((snapshot) =>
				snapshot.forEach((user) => {
					tempArr.push(user.data().at);
				})
			)
			.then(setUsersAt(tempArr));
	}, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        // if 'at doesnt exist proceed
        if (!usersAt.includes(event.target[1].value)) {
            let date = new Date().toLocaleDateString("en-US");
            createUser(event.target[3].value, event.target[4].value, event.target[0].files[0], event.target[1].value, event.target[2].value, date);
            navigate('/');  
        }
        event.target[0].value = ''; 
        event.target[1].value = '';
        event.target[2].value = ''; 
        event.target[3].value = '';
        event.target[4].value = ''; 
    }


    return (
        <div className="signup">
            <div className='signup-container' id='signup-container'>
            <h2>Create your account</h2>
    <form className='signup-form' id='signup-form' onSubmit={handleSubmit}>
        <label htmlFor="file" className='labelSignUp'>At:</label><br></br>
        <input type="file" id="file" name="file" accept="image/*" capture="camera" required></input><br></br>

        <label htmlFor="at-sign" className='labelSignUp'>At:</label><br></br>
        <input type="text" id="at-sign" name="at-sign" required placeholder='John'></input><br></br>

        <label htmlFor="name" className='labelSignUp'>Name:</label><br></br>
        <input type="text" id="name" name="name" required placeholder='John'></input><br></br>

        <label htmlFor="Email" className='labelSignUp'>Email:</label><br></br>
        <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required placeholder='JohnDoe@gmail.com'></input><br></br>

        <label htmlFor="Password" className='labelSignUp'>Password:</label><br></br>
        <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6' required></input><br></br>

        <input type='submit' value='Register'></input>
    </form>
    <div className='signup-check'>
        <p style={{marginTop: '5px'}}>Already have an account?</p>
        <Link to='/login'>
        <p style={{marginTop: '5px'}}>Login here!</p>
        </Link>
    </div>
    </div>
</div>
    )
}

export default Signup;