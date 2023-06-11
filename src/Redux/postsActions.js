export const addPost = (post) => {
  const { id, userId, name, place, comments, latitude, longitude } = post;
  return {
    type: 'ADD_POST',
    payload: [
      {
        id,
        userId,
        name,
        place,
        comments,
        latitude,
        longitude,
      },
    ],
  };
};

export const addPosts = (posts) => {
  console.log(posts);
  return {
    type: 'ADD_POST',
    payload: posts,
  };
};
