import express from 'express';
import { Task } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const allTaskDB = await Task.findAll();
  // console.log(allTaskDB);
  // const data = {
  //   name: 'Vasya',
  //   age: 25,
  // };
  res.json(allTaskDB);
});

router.post('/', async (req, res) => {
  console.log('================', req.body);
  try {
    const newTask = await Task.create({ title: req.body.title });
    // const newTask = await Task.create({ userId: req.body.userId });
    return res.redirect('/tasks');
  } catch (err) {
    console.log(err);
  }
  return res.sendStatus(200);
});

export default router;
