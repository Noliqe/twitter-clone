import { ref, getBlob } from "firebase/storage";
import { auth, storage } from "../../config/firebase-config";

const getImageStorage = () => {
    const file = 'dracula.png'
    const filePath = `${auth.currentUser.uid}/${file}`;
    const pathReference = ref(storage, filePath);
        getBlob(pathReference)
          .then((blob) => {
            console.log('blob: ', blob)
          })
          .catch((error) => {
            console.log('error downloading file: ', error)
          })
}

export default getImageStorage;