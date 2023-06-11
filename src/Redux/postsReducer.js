const initialState = [];

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, ...action.payload];
    default:
      return state;
  }
};
