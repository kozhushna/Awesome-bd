import { auth } from '../../firebaseConfig';
export const selectIsLoggedIn = (state) =>
  state?.user?.auth?.isLoggedIn === true;

export const selectUser = (state) => state?.user?.auth;
export const selectPosts = (state) => {
  return state?.posts?.posts ?? [];
};
