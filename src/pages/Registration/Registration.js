import { useRef } from 'react';
import './registration.css';

export default function Registration(props) {
  const { setPage, setUserData, server } = props;

  const newLog = useRef();
  const newPass = useRef();
  const repeatPass = useRef();
  const userName = useRef();

  async function sendRegHendler() {
    if (newPass.current.value === repeatPass.current.value) {
      setUserData(await server.registration(newLog.current.value, newPass.current.value, userName.current.value))
      setPage("Authorisation");
    }
  }

  const closePage = () => {
    setPage("StartScreen")
  }

  return (
    <fieldset className="form-inner">
      <h2>Регистрация</h2>

      <div className="form-group">
        <span className="details">Логин</span>
        <input
          className="form-input"
          ref={newLog}
          placeholder={'login'}
          type={'login'}
        ></input>
      </div>

      <div className="form-group">
        <span className="details">Имя пользователя</span>
        <input
          className="form-input"
          ref={userName}
          placeholder={'name'}
          type={'name'}
        ></input>
      </div>

      <div className="form-group">
        <span className="details">Пароль</span>
        <input
          className="form-input"
          ref={newPass}
          placeholder={'password'}
          type= "password"
        ></input>
      </div>

      <div className="form-group">
        <span className="details">Повторите пароль</span>
        <input
          className="form-input"
          ref={repeatPass}
          placeholder={'password'}
          type= "password"
        ></input>
      </div>

      <div className="form-type">
        <span className="loginBtn">
          {''}
          <b href="#" onClick={sendRegHendler}></b>
        </span>
        <span className="registBtn">
          <a href="#" onClick={closePage}>закрыть</a>
        </span>
      </div>
    </fieldset>
  );
}
