import express from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import store from 'session-file-store';
import { Telegraf } from 'telegraf';
import { Task, User } from './db/models';
import indexRouter from './components/routes/indexRouter';
import taskRouter from './components/routes/taskRouter';
// import layoutMW from './middlewares/layoutMW';
import authRouter from './components/routes/authRouter';
import botRouter from './components/routes/botRouter';
import jsxRender from './utils/jsxRender';

const FileStore = store(session);
const PORT = 3000;
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public')); // нужно для папок из Паблик
app.use(morgan('dev'));
// app.use(layoutMW);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования
  resave: true, // Пересохранять ли куку при каждом запросе
  store: new FileStore(),
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};
//
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/auth', authRouter);
app.use('/bot', botRouter);

app.post('/', async (req, res) => {
  try {
    const newTask = await Task.create({ ...req.body, isDone: false });
    const plusTask = await Task.findByPk(newTask.id, { include: User });
    res.json(plusTask);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
