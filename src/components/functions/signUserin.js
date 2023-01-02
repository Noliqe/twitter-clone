import { auth } from '../../config/firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";

const signUserIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        console.log('auth/wrong-password.');
      } else {
        console.log('Error code: ', errorCode);
        console.log('Error Message: ', errorMessage);
        console.log('Error: ', error);
      }
    })
}

export default signUserIn;