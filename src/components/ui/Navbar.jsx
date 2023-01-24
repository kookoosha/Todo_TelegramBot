import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function navbar({ userState, setUserState }) {
  const navigate = useNavigate();
  const logHandler = async (e) => {
    e.preventDefault();
    await fetch('/auth/logout').then((res) => {
      if (res.ok) {
        setUserState(null);
        navigate('/auth/logout');
      }
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light m-30">

      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {userState && (
          <>
            <a className="navbar-brand" href="/">Главная</a>
            <div className="navbar-nav">

              <a className="nav-link" href="/about">Описание </a>
              <a className="nav-link" href="/tasks">Задачи/ToDo</a>
              {/* <a className="nav-link disabled">Disabled</a> */}
            </div>
          </>
          ) }

        </div>
        {
          !userState
          && (
          <>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <a className="nav-link mr-2" href="/auth/reg">Регистрация</a>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <a className="nav-link" href="/auth">Авторизация</a>
            </div>
          </>
          )

        }

        {userState && (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <a onClick={logHandler} className="nav-link" href="/auth/logout">выход</a>
        </div>
        )}

      </div>

    </nav>
  );
}
