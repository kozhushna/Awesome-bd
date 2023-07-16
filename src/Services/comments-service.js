import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { updatePost } from './posts-service';

export const getPostComments = async (postId) => {
  const q = query(
    collection(db, 'postscomments'),
    where('postId', '==', postId)
  );
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

export const createComment = async ({ postId, userId, image, text }) => {
  const comment = await addDoc(collection(db, 'postscomments'), {
    postId,
    userId,
    image,
    text,
    createdDate: new Date(),
  });
  await updatePost(postId);
  return comment;
};
