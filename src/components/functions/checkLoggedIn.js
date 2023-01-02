import { auth } from '../../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";

const checkLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
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