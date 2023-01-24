import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './ui/Navbar';
import ToDoList from './pages/ToDoList';

import Home from './pages/Home';
import About from './pages/About';
import TaskInfo from './pages/TaskInfo';
import Reg from './pages/auth/Reg';
import Auth from './pages/auth/Auth';
import Logout from './pages/auth/Logout';

export default function App({ user, toDo, taskById }) {
  const [userState, setUserState] = useState(user || null);
  console.log('App', toDo);
  return (
    <div className="container">
      <Navbar userState={userState} setUserState={setUserState} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<ToDoList toDo={toDo} userState={userState} backendTasks={toDo} />} />
        <Route path="/tasks/:id" element={<TaskInfo task={taskById} />} />
        <Route path="/auth/reg" element={<Reg setUserState={setUserState} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/logout" element={<Logout />} />

      </Routes>

    </div>
  );
}
