import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const createPost = async ({
  userId,
  name,
  place,
  latitude,
  longitude,
}) => {
  return await addDoc(collection(db, 'posts'), {
    userId,
    name,
    place,
    comments: [],
    latitude,
    longitude,
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
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
