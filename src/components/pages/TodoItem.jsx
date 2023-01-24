import React, { useState } from 'react';

export default function TodoItem({
  userState, item, deleteHandler, taskState, inputGroup, setInputGroup, error,
}) {
  const [author, setAuthor] = useState();
  const [isEdit, setEdit] = useState(false);
  const editHandler = (e) => {
    setEdit((prev) => !prev);
  };

  const [editInput, setEditInput] = useState(item || {
    title: '',
  });
  // console.log('EditInput', editInput.User?.name);
  const changeInputHandler = (e) => {
    setEditInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveInputHandler = async (e) => {
    setEdit((prev) => !prev);
    await fetch(
      `/tasks/${item.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editInput),
      },
    );
  };

  return (
    <li className=" list-group-item">

      {
          isEdit && (<input name="title" onChange={changeInputHandler} value={editInput.title} />)
       }
      {
        !isEdit && (
        <>
          <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
          <label className="form-check-label  " htmlFor="firstCheckbox">{editInput.title}</label>
        </>
        )
       }
      <p>{`Автор: ${editInput.User?.name}`}</p>
      {/* кнопка: Edit */}
      <div className="mt-2">
        {!isEdit ? (
          <button
            onClick={() => editHandler(item.id)}
            type="button"
            className="btn btn-outline-warning btn-sm "
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => saveInputHandler()}
            type="button"
            className="btn btn-outline-warning btn-sm "
          >
            save
          </button>
        )}

        {/* кнопка: детали */}
        {!isEdit && (
        <a
          href={`/tasks/${item.id}`}
          type="button"
          className="btn btn-outline-info btn-sm "
        >
          Детали
        </a>
        ) }

        {/* кнопка: delit */}
        {!isEdit && (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm "
          onClick={() => deleteHandler(item.id)}
        >
          Удалить

        </button>
        ) }
        {error.id === item.id && error.text}
      </div>
    </li>

  );
}
