import React from 'react';

export default function Auth() {
  const regHandler = async (e) => {
    e.preventDefault();
    await fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    }).then((res) => {
      if (res.ok) {
        window.location = '/tasks';
      }
    });
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4">
          <h5>Авторизация</h5>
          <form onSubmit={regHandler}>
            <div className="mb-3">
              <input
                name="name"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Имя"
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Пароль"
              />
            </div>

            <button type="submit" className="btn btn-primary">Отправить</button>
          </form>
        </div>
      </div>
    </div>

  );
}
