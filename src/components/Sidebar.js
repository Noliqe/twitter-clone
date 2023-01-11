import '../styles/sidebar.css';
import { Link } from 'react-router-dom';
import Searchbar from './searchbar';
import React, { useState, useEffect, useContext } from 'react';
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
  } from 'firebase/firestore';
  import FollowUsers from './followUsers';
  import DeviceContext from './context/deviceContext';


const Sidebar = (props) => {
    const [users, setUsers] = useState('');
    const [randomUsers, setRandomUsers] = useState({
        first: {
            userAt: '@',
            image: 'https://www.google.com/images/spin-32.gif?a',
            uid: '',
            id: '',
        },
        second: {
            userAt: '@',
            image: 'https://www.google.com/images/spin-32.gif?a',
            uid: '',
            id: '',
        },
        third: {
            userAt: '@',
            image: 'https://www.google.com/images/spin-32.gif?a',
            uid: '',
            id: '',
        }
    });
    const { device } = useContext(DeviceContext);

    useEffect(() => {
        if (props.data !== undefined) {
            loadUsers()
        }
    }, [props.data]);

    useEffect(() => {
        if(users !== '' && randomUsers.first.userAt === '@') {
            getRandomUsers();
        }
    }, [users]);

    // load all users
    const loadUsers = () => {
        const recentMessagesQuery = query(collection(getFirestore(), 'users'));
        
        let arr = [];
        // Start listening to the query.
        onSnapshot(recentMessagesQuery, function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              let users = change.doc.data();
                if (change.doc.data().userAt !== props.data.userAt) {
                    arr.push({...users, id: change.doc.id})
                }
          });
          setUsers(arr);
        });
        
    }

    // get 3 random users to follow
    const getRandomUsers = () => {
        const usersLengthArr = [];

        for (let i = 0; i < users.length; i++) {
            usersLengthArr.push(i);
        }
        for (let i = 0; i < usersLengthArr.length; i++) {
            if (usersLengthArr.length > 3) {
                let randomNum = Math.floor(Math.random()*usersLengthArr.length);
                usersLengthArr.splice(randomNum, +1);
            }
        }
        setRandomUsers(prev =>({...prev,
        first: { 
            ...prev.first,
            userAt: users[usersLengthArr[0]].userAt,
            uid: users[usersLengthArr[0]].uid,
            name: users[usersLengthArr[0]].name,
            id: users[usersLengthArr[0]].id,
        },
        second: { 
            ...prev.second,
            userAt: users[usersLengthArr[1]].userAt,
            uid: users[usersLengthArr[1]].uid,
            name: users[usersLengthArr[1]].name,
            id: users[usersLengthArr[1]].id,
        },
        third: { 
            ...prev.third, 
            userAt: users[usersLengthArr[2]].userAt,
            uid: users[usersLengthArr[2]].uid,
            name: users[usersLengthArr[2]].name,
            id: users[usersLengthArr[2]].id,
        }}));
    }





    const handleContent = () => {
        if (!props.loggedIn && device !== 'mobile') {
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
                        <Link to='/login'>
                        <button className='footer-login-btn'>Log in</button>
                        </Link>
                        <Link to='/signup'>
                        <button className='footer-signup-btn'>Sign up</button>
                        </Link>
                    </div>
                        </div>
                    </div>
                </div>
            )
        } if (randomUsers.first.uid !== '' && device !== 'mobile') {
            return (
                <div className='sidebar-container'>
                    <div className='sidebar-searchbar'>
                    <Searchbar />
                    </div>
                <div className='sidebar-follow'>
                    <h2>Who to follow</h2>
                    <FollowUsers userAt={randomUsers.first.userAt} imagePath={randomUsers.first.uid} 
                    name={randomUsers.first.name} id={randomUsers.first.id} current={props.data}/>
                    <FollowUsers userAt={randomUsers.second.userAt} imagePath={randomUsers.second.uid} 
                    name={randomUsers.second.name} id={randomUsers.second.id} current={props.data}/>
                    <FollowUsers userAt={randomUsers.third.userAt} imagePath={randomUsers.third.uid} 
                    name={randomUsers.third.name} id={randomUsers.third.id} current={props.data}/>
                </div>
                </div>
            )
        } else if (randomUsers.first.uid === '' && device !== 'mobile'){
            return (
                <div className='sidebar-container'>
                    <Searchbar />
                </div>
            )
        }
}




return (
    <div className="sidebar" style={{maxWidth: device === 'mobile' ? '0px' : '350px'}}>
        {handleContent()}
</div>
)
}
    
export default Sidebar;