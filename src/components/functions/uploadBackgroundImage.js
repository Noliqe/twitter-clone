import { auth, storage } from "../../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const UploadBackgroundImage = (info) => {
    saveBackgroundImage(info);
    async function saveBackgroundImage(file) {
        try {
            const filePath = `background-pictures/${auth.currentUser.uid}`;
            const newImageRef = ref(storage, filePath);
            uploadBytes(newImageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
        } catch (error) {
          console.error('There was an error uploading a file to Cloud Storage:', error);
        }
      }
}

export default UploadBackgroundImage;