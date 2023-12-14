import db from '../utils/db';

export const getComments = async (skip, take) => {
  const count = await db.comment.count();
  const comments = await db.comment.findMany({
    skip,
    take,
  });
  return { count, comments };
};

export const getComment = async (id) =>
  db.comment.findUnique({ where: { id } });

export const addComment = async (commentData, firebase_uid) => {
    if (firebase_uid) {
      let user = await db.user.findUnique({where: {firebase_uid}});
      commentData.user_id = user.id;
    }
    return db.comment.create({ data: { ...commentData } });
  }

export const updateComment = async (id, commentData) => {
  const comment = await getComment(id);
  if (comment) {
    return db.comment.update({
      where: { id },
      data: { ...comment, ...commentData },
    });
  }
  return null;
};

export const deleteComment = async (id) =>
  db.comment.delete({ where: { id } });
