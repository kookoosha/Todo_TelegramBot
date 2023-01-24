import React, { useState } from 'react';
import InputTask from '../ui/InputTask';
import RandomTask from '../ui/RandomTask';

import TodoItem from './TodoItem';

export default function ToDoList({ backendTasks, userState, toDo }) {
  const [inputGroup, setInputGroup] = useState({
    title: '',
    description: '',
  });

  const inputHandler = (e) => {
    setInputGroup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [allTasks, setAllTasks] = useState(backendTasks || []);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...inputGroup, userId: userState.id }),
    })
      .then((res) => res.json())
      .then((data) => setAllTasks((prev) => [data, ...prev]));
  };

  const [taskState, setTaskState] = useState();
  const [error, setError] = useState({
    id: null,
    text: '',
  });

  const deleteHandler = (id) => {
    fetch(`/tasks/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) { setAllTasks((prev) => prev.filter((task) => task.id != id)); } else {
          setError({
            id,
            text: 'не ты создавал!',
          });
        }
      })
      .catch(console.log);
  };
  console.log(backendTasks.User);
  return (

    <div className="row m-20">
      <div className="col-6 ">
        <div>
          <InputTask
            inputHandler={inputHandler}
            setInputGroup={setInputGroup}
            inputGroup={inputGroup}
            taskState={taskState}
            submitHandler={submitHandler}
          />
        </div>
        <div className="mt-4">
          <RandomTask />
        </div>
      </div>
      <div className="col-6">
        <h3 className="mt-3">TO DO</h3>
        <ul className="list-group">
          {
            allTasks ? allTasks.map((el) => <TodoItem error={error} userState={userState} setInputGroup={setInputGroup} inputGroup={inputGroup} deleteHandler={deleteHandler} item={el} key={el.id} />) : 'No ToDo'
          }
        </ul>
      </div>
    </div>

  );
}
