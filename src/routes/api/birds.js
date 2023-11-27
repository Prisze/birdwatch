import { Router } from 'express';
import {
  getBird,
  getBirds,
  addBird,
  updateBird,
  deleteBird,
} from '../../models/birds';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, birds } = await getBirds(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(birds);
});

router.get('/:id', async (req, res) => {
  const bird = await getBird(req.params.id);
  if (bird) {
    res.send(bird);
  } else {
    res.status(404).send({ msg: 'Bird not found' });
  }
});

router.post('/', async (req, res) => {
  const bird = await addBird(req.body);
  res.send(bird);
});

router.put('/:id', async (req, res) => {
  const bird = await updateBird(req.params.id, req.body);
  if (bird) {
    res.send(bird);
  } else {
    res.status(404).send({ msg: 'Bird not found' });
  }
});

router.delete('/:id', async (req, res) => {
  await deleteBird(req.params.id);
  res.status(204).send();
});

export default router;
