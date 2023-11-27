import db from '../utils/db';

export const getBirds = async (skip, take) => {
  const count = await db.bird.count();
  const birds = await db.bird.findMany({
    skip,
    take,
  });
  return { count, birds };
};

export const getBird = async (id) =>
  db.bird.findUnique({ where: { id } });

export const addBird = async (birdData) =>
  db.bird.create({ data: { ...birdData } });

export const updateBird = async (id, birdData) => {
  const bird = await getBird(id);
  if (bird) {
    return db.bird.update({
      where: { id },
      data: { ...bird, ...birdData },
    });
  }
  return null;
};

export const deleteBird = async (id) =>
  db.bird.delete({ where: { id } });
