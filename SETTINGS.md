npm install
или
npm init -y
============================================================================================
npx gitignore node
добавляем в .gitignore записи: 
public/app.js
public/vendor.js
sessions/
============================================================================================
npx eslint --init 
============================================================================================
npm i -D @babel/node @babel/plugin-proposal-class-properties @babel/preset-react @babel/preset-env babel-loader morgan webpack webpack-cli

в некоторых случаях может понадобиться @babel/core
============================================================================================
npm i express react react-dom react-router-dom sequelize sequelize-cli pg pg-hstore
============================================================================================
Для dotenv, session, bcrypt, axios устанавливайте
npm i dotenv express-session session-file-store bcrypt axios
============================================================================================
Создаём файл .babelrc и вставляем конфигурацию:

{
    "presets": [
      ["@babel/preset-env", { "targets": { "node": "current" } }],
      "@babel/preset-react"
    ],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}
============================================================================================
Создаём файл webpack.config.js и вставляем конфигурацию:

const path = require('path');

const config = {
  entry: {
    app: ['./src/components/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    globalObject: 'this',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          chunks: 'all', // both : consider sync + async chunks for evaluation
          name: 'vendor', // имя чанк-файла
          test: /node_modules/, // test regular expression
        },
      },
    },
  },
};

module.exports = config;
============================================================================================
Добавляем скрипты в package.json

"scripts": {
    "webpack": "webpack -wd eval-source-map",
    "dev": "babel-node src/server.js"
  },
============================================================================================
Создаём папку src, в неё добавляем server.js
============================================================================================
Создаём файл .sequelizerc

const path = require('path');

module.exports = {
  'config': path.resolve('src', 'db', 'config', 'database.json'),
  'models-path': path.resolve('src', 'db', 'models'),
  'seeders-path': path.resolve('src', 'db', 'seeders'),
  'migrations-path': path.resolve('src', 'db', 'migrations')
};
============================================================================================
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:string
npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name users
npx sequelize-cli db:seed:all
============================================================================================
Создаём файл src/components/App.jsx 
-> rfc (пользуйся сниппетом)

import React from 'react'

export default function App() {
  return (
    <div>App</div>
  );
}
============================================================================================
Создаём файл src/components/Layout.jsx и наполняем его html разметкой. Не забываем подключить срипты app.js и vendor.js. Для гидратации прописываем скрипт, передающий initState в window

import React from 'react';
import App from './App';

export default function Layout({ initState }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.initState=${JSON.stringify(initState)}`,
          }}
        />
        <script defer src="/app.js" />
        <script defer src="/vendor.js" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <App {...initState} />
        </div>
      </body>
    </html>
  );
}

============================================================================================
Если нужен React Routing, то в Layout.jsx оборачиваем компонент <App /> в роутер:

import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export default function Layout({ initState }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.initState=${JSON.stringify(initState)}`,
          }}
        />
        <script defer src="/app.js" />
        <script defer src="/vendor.js" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <StaticRouter location={initState.path}>
            <App {...initState} />
          </StaticRouter>
        </div>
      </body>
    </html>
  );
}

============================================================================================
Для подключения гидратации hydrateRoot создаём файл src/components/index.jsx и наполняем его (если не нужен роутинг, то удалите <BrowserRouter>):

import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOMClient.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App {...window.initState} />
  </BrowserRouter>,
);

============================================================================================
Создаём файл src/server.js
Настраиваем server.js
В папке src/routes -> разбиваем логику роутов на разные файлы
В компонентах настраиваем Routes, Route, закидываем пару компонентов
============================================================================================
Минимальный пример server.js

import express from 'express';
import morgan from 'morgan';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/Layout';

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const initState = { path: req.originalUrl };
    const layoutComponent = React.createElement(Layout, { initState });
    const html = renderToString(layoutComponent);
    res.write('<!DOCTYPE html>');
    res.end(html);
});


app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
============================================================================================
Пример middleware для res.layout:

import React from 'react';
import { renderToString } from 'react-dom/server';
import Layout from '../components/Layout';

export default function layout(req, res, next) {
  res.layout = (initState) => {
    const layoutComponent = React.createElement(Layout, { initState });
    const html = renderToString(layoutComponent);
    res.write('<!DOCTYPE html>');
    res.end(html);
  };
  next();
}

============================================================================================
Пример server.js с сессиями и роутами

import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3002;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', 				// Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test',	// Секретное слово для шифрования, может быть любым
  resave: true, 				// Пересохранять ли куку при каждом запросе
  store: new FileStore(),
  saveUninitialized: false, 		// Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, 				// Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));