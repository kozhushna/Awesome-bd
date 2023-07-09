import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImageToFirebase = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      'images/' + Math.random().toString(36).substring(7)
    );

    const snapshot = await uploadBytes(storageRef, blob);
    //console.log(snapshot);
    // const ref = storage
    //   .ref()
    //   .child('images/' + Math.random().toString(36).substring(7));
    // await ref.put(blob);

    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Upload success!', downloadURL);
    return downloadURL;
  } catch (error) {
    console.log('Upload error:', error);
  }
};

export default uploadImageToFirebase;
