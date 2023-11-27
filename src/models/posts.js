import db from '../utils/db';

export const getPosts = async (skip, take) => {
  const count = await db.post.count();
  const posts = await db.post.findMany({
    skip,
    take,
    include: { user: true, bird: true, comments: true }, // Including related entities
  });
  return { count, posts };
};

export const getPost = async (id) =>
  db.post.findUnique({ where: { id }, include: { user: true, bird: true, comments: true } });

export const addPost = async (postData) =>
  db.post.create({ data: { ...postData } });

export const updatePost = async (id, postData) => {
  const post = await getPost(id);
  if (post) {
    return db.post.update({
      where: { id },
      data: { ...post, ...postData },
    });
  }
  return null;
};

export const deletePost = async (id) =>
  db.post.delete({ where: { id } });

// Additional function to get comments on a post
export const getCommentsOnPost = async (postId) =>
  db.comment.findMany({ where: { postId } });
