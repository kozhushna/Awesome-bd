export const addPost = (posts) => {
  // const { id, userId, name, place, comments, latitude, longitude } = posts;

  return {
    type: 'ADD_POST',
    payload: { posts: posts },
    // payload: [
    //   {
    //     id,
    //     userId,
    //     name,
    //     place,
    //     comments,
    //     latitude,
    //     longitude,
    //   },
    // ],
  };
};
