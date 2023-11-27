import { Router } from 'express';
import {
  getPost,
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getCommentsOnPost,
} from '../../models/posts';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, posts } = await getPosts(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(posts);
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ msg: 'Post not found' });
  }
});

router.post('/', async (req, res) => {
  const post = await addPost(req.body);
  res.send(post);
});

router.put('/:id', async (req, res) => {
  const post = await updatePost(req.params.id, req.body);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ msg: 'Post not found' });
  }
});

router.delete('/:id', async (req, res) => {
  await deletePost(req.params.id);
  res.status(204).send();
});

// Additional route to get comments on a post
router.get('/:id/comments', async (req, res) => {
  const comments = await getCommentsOnPost(req.params.id);
  res.send(comments);
});

export default router;
