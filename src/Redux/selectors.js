export const selectIsLoggedIn = (state) =>
  state?.user?.auth?.isLoggedIn === true;

export const selectUser = (state) => state?.user?.auth;
export const selectPosts = (state) => state.posts ?? [];
