import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const UpdateProfileName = (info) => {
    updateProfile(auth.currentUser, {
        displayName: info
      }).then(() => {
        // Profile updated!
        console.log('done');
      }).catch((error) => {
        // An error occurred
        console.log(error);
      });
}

export default UpdateProfileName;