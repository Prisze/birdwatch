import { Router } from 'express';
import {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getPostsByUser,
} from '../../models/users';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, users } = await getUsers(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

router.post('/', async (req, res) => {
  const user = await addUser(req.body);
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

router.delete('/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).send();
});

// Additional route to get posts by a user
router.get('/:id/posts', async (req, res) => {
  const posts = await getPostsByUser(req.params.id);
  res.send(posts);
});

export default router;
