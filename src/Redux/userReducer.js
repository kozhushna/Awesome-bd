const initialState = {
  auth: {
    email: '',
    displayName: '',
    isLoggedIn: false,
    id: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return action.payload;
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
