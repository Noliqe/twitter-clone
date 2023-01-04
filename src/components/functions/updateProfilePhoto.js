import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const UpdateProfilePhoto = (info) => {
    updateProfile(auth.currentUser, {
        photoURL: info
      }).then(() => {
        // Profile updated!
        console.log('done');
      }).catch((error) => {
        // An error occurred
        console.log(error);
      });
}

export default UpdateProfilePhoto;