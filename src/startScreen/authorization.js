import { useRef } from 'react';
import './authorization.css';

export default function Authorization(props) {
  const { setData, server, setState } = props;

  const login = useRef();
  const password = useRef();

  async function sendLoginHandler() {
    setData(await server.login(login.current.value, password.current.value));
  }

  return (
    <form className="form">
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
              <a href="#" onClick={setState}>закрыть</a>
            </span>
          </div>
        </fieldset>
    </form>
  );
}
