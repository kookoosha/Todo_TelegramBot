import TaskInfo from '../pages/TaskInfo';
import { Task } from '../../db/models';

const canDelete = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, userId: req.session.user.id } });
  if (task) { next(); } else { res.sendStatus(400); }
};
export default canDelete;
