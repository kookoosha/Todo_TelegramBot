import React, { useState } from 'react';

export default function About() {
  const [randomTask, setRandomTask] = useState('');
  const taskFetch = async () => {
    try {
      const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await responce.json();
      setRandomTask(data[Math.floor(Math.random() * data.length)]);
      // console.log(data[Math.floor(Math.random() * data.length)]);
    } catch (error) { console.error(error.message); }
  };
  return (
    <div>

      <button onClick={taskFetch} type="button" className="btn btn-outline-warning">Случайная задача</button>
      <p className="mt-5">
        {randomTask.title}
      </p>
    </div>
  );
}
