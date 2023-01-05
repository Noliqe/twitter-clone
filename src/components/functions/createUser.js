import { auth } from '../../config/firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import signUserIn from './signUserin.js';
import uploadUser from './uploadUser';
import UploadMedia from './uploadMedia';
import UpdateProfileName from './UpdateProfileName';

const createUser = async (email, password, image, at, name, date) => {
    // createUserWithEmailAndPassword(auth, email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    signUserIn(email, password);
    // const user = userCredential.user;
    UploadMedia(image);
    UpdateProfileName(name)
    uploadUser(name, at, date)
    // ...
  })
  .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  if (errorCode === 'auth/email-already-in-use') {
    console.log('auth/email-already-in-use.');
  } else {
    console.log(errorMessage);
    console.log('Error code: ', errorCode);
    console.log('Error Message: ', errorMessage);
    console.log('Error: ', error);
    }
  });
}

export default createUser;