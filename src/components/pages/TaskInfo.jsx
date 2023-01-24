import React from 'react';

export default function TaskInfo({ task }) {
  return (
    <div>
      <h3 className="mt-3">
        Подробное описание задачи
      </h3>
      <p className="mt-5 lead">
        {task.description}
      </p>
      {/* кнопка: назад */}
      <a
        href="/tasks/"
        type="button"
        className="btn btn-outline-secondary mt-5"
      >
        Вернуться к списку задач
      </a>
      {/* кнопка: назад */}
    </div>
  );
}
