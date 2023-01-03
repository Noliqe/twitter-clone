import { auth } from "../../config/firebase-config";
// Returns the signed-in user's profile Pic URL.
const getProfilePicUrl = () => {
// return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
    try {
      if (auth.currentUser !== null) {
        return auth.currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
      } else {
        return 'https://www.w3schools.com/howto/img_avatar.png';
      }
    } catch (error) {
      console.error(error);
    }
}

export default getProfilePicUrl;