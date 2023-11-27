import db from '../utils/db';

export const getUsers = async (skip, take) => {
  const count = await db.user.count();
  const users = await db.user.findMany({
    skip,
    take,
  });
  return { count, users };
};

export const getUser = async (id) =>
  db.user.findUnique({ where: { id } });

export const addUser = async (userData) =>
  db.user.create({ data: { ...userData } });

export const updateUser = async (id, userData) => {
  const user = await getUser(id);
  if (user) {
    return db.user.update({
      where: { id },
      data: { ...user, ...userData },
    });
  }
  return null;
};

export const deleteUser = async (id) =>
  db.user.delete({ where: { id } });

// Additional function to get posts by a user
export const getPostsByUser = async (userId) =>
  db.post.findMany({ where: { userId } });
