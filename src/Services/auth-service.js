import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import uploadImageToFirebase from './storage-service';

export const registerDB = async ({ email, password, login, avatar }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateUserProfile(login, avatar);
  return auth.currentUser;
};

export const loginDB = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return auth.currentUser;
};

export const logOut = async () => {
  try {
    const result = await signOut(auth);
    return true;
  } catch {
    return false;
  }
};

const updateUserProfile = async (displayName, avatar) => {
  const user = auth.currentUser;
  let photoURL = '';

  if (user) {
    if (avatar) {
      photoURL = await uploadImageToFirebase(avatar);
    }
    return await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });
  }
};
