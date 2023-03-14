import { useRef } from 'react';
import './authorization.css';

export default function Authorization(props) {
  const { setUserData, server, setPage } = props;

  const login = useRef();
  const password = useRef();

  async function sendLoginHandler() {
    const access = await server.login(login.current.value, password.current.value);
    if (access) {
      setUserData(access);
      setPage("Menu");
    }
  }

  const closePage = () => {
    setPage("StartScreen")
  }

  return (
   <div className = "authorization">
      <div className='autoriz'>АВТОРИЗАЦИЯ</div>
      <button className='buttonClose' onClick={()=>closePage()}></button>
      <div className='loginHandler'>
        <input className='input' placeholder='login' ref={login}></input>
        <input className='input' placeholder='password' ref={password} type="password"></input>
        <button className='buttonEnter' onClick={()=>sendLoginHandler()}>ВОЙТИ</button>
      </div>
   </div>
  );
}
