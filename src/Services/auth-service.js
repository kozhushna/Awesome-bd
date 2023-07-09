import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const registerDB = async ({ email, password, login }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateUserProfile(login);
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

const updateUserProfile = async (displayName) => {
  const user = auth.currentUser;
  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    return await updateProfile(user, {
      displayName: displayName,
    });
  }
};
