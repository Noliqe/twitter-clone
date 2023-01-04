import { auth, storage } from "../../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const UploadMedia = (info) => {
    saveProfileImage(info);
    async function saveProfileImage(file) {
        try {
            const filePath = `${auth.currentUser.uid}/${file.name}`;
            const newImageRef = ref(storage, filePath);
            uploadBytes(newImageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
        } catch (error) {
          console.error('There was an error uploading a file to Cloud Storage:', error);
        }
      }
}

export default UploadMedia;