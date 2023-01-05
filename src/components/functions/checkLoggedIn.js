import { auth } from '../../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";

const checkLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user is logged in');
        return true;
      } else {
        // User is signed out
        // ...
        console.log('user not logged in');
        return false;
      }
    });
}

export default checkLoggedIn;