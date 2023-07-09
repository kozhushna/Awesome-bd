export const storeUser = (user) => {
  return {
    type: 'AUTH_USER',
    payload: {
      auth: {
        email: user.email,
        displayName: user.displayName,
        isLoggedIn: true,
        id: user.uid,
        photoURL: user.photoURL,
      },
    },
  };
};
export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
    payload: null,
  };
};
