import { auth } from '../../config/firebase-config.js';
import { signOut } from "firebase/auth";

const signUserOut = () => {
    signOut(auth).then(() => {
      console.log('logged out');
      // checkLoggedIn();
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
}

export default signUserOut;