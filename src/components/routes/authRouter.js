import { compare, hash } from 'bcrypt';
import express from 'express';
import { User } from '../../db/models';

const authRouter = express.Router();

authRouter.route('/reg')
  .get((req, res) => {
    res.render('Layout');
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) { return res.sendStatus(400); }
    const hashPassword = await hash(password, 4);
    try {
      const [newUser, isCreated] = await User.findOrCreate({
        where: { email },
        defaults: { name, email, password: hashPassword },
      });
      if (!isCreated) return res.sendStatus(400);
      req.session.user = { id: newUser.id, name: newUser.name, email: newUser.email };
      res.json({ id: newUser.id, name: newUser.name, email: newUser.email });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  });

authRouter.route('/')
  .get((req, res) => {
    const initState = { };
    res.render('Layout');
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) { return res.sendStatus(400); }
    try {
      const userFromDb = await User.findOne({ where: { email } }); // находим пароль юзера
      // проверяем на наличие, если нет то отправляем ошибку
      if (!userFromDb) return res.json({ status: 400, message: 'email not found!' });
      // сравниваем пароль, для этого его расхешируем
      const isValid = await compare(password, userFromDb.password);
      // проверяем валидность пароля, если нет то отправляем ошибку
      if (!isValid) return res.json({ status: 400, message: 'pass not valid!' });
      // создаём сессию под юзера
      req.session.user = ({ id: userFromDb.id, name: userFromDb.name, email: userFromDb.email });
      res.json({ id: userFromDb.id, name: userFromDb.name, email: userFromDb.email });
    } catch (err) {
      console.log(err);
    }
  });
authRouter.get('/logout', (req, res) => {
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.redirect('/');
});

export default authRouter;
