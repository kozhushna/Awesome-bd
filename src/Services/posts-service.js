import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import uploadImageToFirebase from './storage-service';

export const createPost = async ({
  userId,
  name,
  place,
  latitude,
  longitude,
  selectedFoto,
}) => {
  let fotoUri = '';
  if (selectedFoto) {
    fotoUri = await uploadImageToFirebase(selectedFoto);
  }

  return await addDoc(collection(db, 'posts'), {
    userId,
    name,
    place,
    comments: [],
    latitude,
    longitude,
    fotoUri,
  });
};

export const getAllPosts = async (userId) => {
  // const q = query(collection(db, 'posts'), where('userId', '==', userId));
  try {
    //const querySnapshot = await getDocs(q);
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (userId) => {
  const q = query(collection(db, 'posts'), where('userId', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (postId) => {
  try {
    const docRef = doc(db, 'posts', postId);
    const querySnapshot = await getDoc(docRef);
    const result = querySnapshot.data();
    await updateDoc(doc(db, 'posts', postId), {
      commentsCount: (result.commentsCount ?? 0) + 1,
    });
  } catch (error) {
    console.log(error);
  }
};
