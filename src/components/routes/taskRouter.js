import express from 'express';
import { Task, User } from '../../db/models';
import canDelete from '../middlewares/canDelete';

const router = express.Router();

router.get('/', async (req, res) => {
  const toDo = await Task.findAll({ include: User });
  console.log('back', toDo);
  const initState = { path: req.originalUrl, toDo };
  res.render('Layout', initState);
});
router.delete('/:id', canDelete, async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id, userId: req.session.user.id } });
  res.sendStatus(200);
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const taskById = await Task.findByPk(id);
  const initState = { path: req.originalUrl, taskById };
  res.render('Layout', initState);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const edit = await Task.update({ title }, { where: { id } });
  console.log(edit);
  res.sendStatus(200);
});

export default router;
