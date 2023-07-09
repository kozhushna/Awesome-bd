const initialState = { posts: [] };

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return action.payload;
    default:
      return state;
  }
};

export default postsReducer;
