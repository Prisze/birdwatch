import { Router } from 'express';
import {
  getComment,
  getComments,
  addComment,
  updateComment,
  deleteComment,
} from '../../models/comments';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, comments } = await getComments(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(comments);
});

router.get('/:id', async (req, res) => {
  const comment = await getComment(req.params.id);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send({ msg: 'Comment not found' });
  }
});

router.post('/', async (req, res) => {
  const comment = await addComment(req.body);
  res.send(comment);
});

router.put('/:id', async (req, res) => {
  const comment = await updateComment(req.params.id, req.body);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send({ msg: 'Comment not found' });
  }
});

router.delete('/:id', async (req, res) => {
  await deleteComment(req.params.id);
  res.status(204).send();
});

export default router;
