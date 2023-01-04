import createUser from './functions/createUser';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import UploadMedia from './functions/uploadMedia';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../config/firebase-config';
import UpdateProfileName from './functions/UpdateProfileName';
import React, { useState, useEffect } from 'react';
import uploadUser from './functions/uploadUser';

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
        if (!usersAt.includes(event.target[1].value)) {
            createUser(event.target[3].value, event.target[4].value, event.target[0].files[0], event.target[1].value, event.target[2].value);
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
        <input type="text" id="at-sign" name="at-sign" required></input><br></br>

        <label htmlFor="name" className='labelSignUp'>Name:</label><br></br>
        <input type="text" id="name" name="name" required></input><br></br>

        <label htmlFor="Email" className='labelSignUp'>Email:</label><br></br>
        <input type="Email" id="Email" name="Email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required></input><br></br>

        <label htmlFor="Password" className='labelSignUp'>Password:</label><br></br>
        <input type="password" id="Password" name="Password" minLength='6' title='Password minimum length is 6' required></input><br></br>

        <input type='submit' value='Register'></input>
    </form>
    <div className='signup-check'>
        Already have an account? Login here!
    </div>
    </div>
</div>
    )
}

export default Signup;