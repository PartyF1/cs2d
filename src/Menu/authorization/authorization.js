import { useRef, useState } from 'react';
import Registration from './registration';
import './authorization.css';

export default function Authorization(props) {
  const { setData, server } = props;
  const [registForm, setRegistForm] = useState(false);

  const login = useRef();
  const password = useRef();

  async function sendLoginHandler() {
    setData(await server.login(login.current.value, password.current.value));
  }

  function registFormHandler() {
    setRegistForm(!registForm);
  }

  return (
    <form className="form">
      {registForm ? (
        <Registration registFormHandler={registFormHandler} setData={setData} server={server}/>
      ) : (
        <fieldset className="form-inner">
          <h2>Авторизация</h2>

          <div className="form-group">
            <span className="details">Логин</span>
            <input ref={login} placeholder={'login'} type={'login'}></input>
          </div>

          <div className="form-group">
            <span className="details">Пароль</span>
            <input
              ref={password}
              placeholder={'password'}
              type={'password'}
            ></input>
          </div>

          <div className="form-type">
            <span className="loginBtn">
              {' '}
              <a href="#" onClick={sendLoginHandler}></a>
            </span>
            <span>
              <span>Нет аккаунта? : </span>
              <a href="#" onClick={registFormHandler}>Регистрация</a>
            </span>
          </div>
        </fieldset>
      )}
    </form>
  );
}
