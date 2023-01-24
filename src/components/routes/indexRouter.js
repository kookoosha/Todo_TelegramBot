import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import Layout from '../Layout';
import { Task } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  const toDo = await Task.findAll();
  const initState = { path: req.originalUrl, toDo };
  res.render('Layout', initState);
});

router.get('/about', async (req, res) => {
  const toDo = await Task.findAll();
  const initState = { path: req.originalUrl, toDo };
  res.render('Layout', initState);
});

export default router;
