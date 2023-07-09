import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { updatePost } from './posts-service';

export const createComment = async ({ postId, userId, userAvatar, text }) => {
  const comment = await addDoc(collection(db, 'comments'), {
    postId,
    userId,
    userAvatar,
    text,
    createdDate: new Date(),
  });
  updatePost(postId);
  return comment;
};
