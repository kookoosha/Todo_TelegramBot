import React from 'react';

export default function InputTask({
  submitHandler, inputGroup, setInputGroup, inputHandler,
}) {
  return (

    <form
      onSubmit={submitHandler}
      className="mt-3"
      method="POST"
      action="/"

    >
      <h3>Записать задачу</h3>

      <div className="mb-3">

        <input
          onChange={inputHandler}
          value={inputGroup.title}
          name="title"
          type="text"
          className="form-control"
          placeholder="Задача"
        />

      </div>
      <div className="mb-3">

        <input
          onChange={inputHandler}
          value={inputGroup.description}
          name="description"
          type="text"
          className="form-control"
          placeholder="Описание задачи"
        />

      </div>

      <button type="submit" className="btn btn-outline-success">Записать</button>
    </form>
  );
}
