import { getAuth } from "firebase/auth";
// Returns the signed-in user's profile Pic URL.
const getProfilePicUrl = () => {
// return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
    try {
      if (getAuth().currentUser !== null) {
        return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
      } else {
        return 'https://www.w3schools.com/howto/img_avatar.png';
      }
    } catch (error) {
      console.error(error);
    }
}

export default getProfilePicUrl;