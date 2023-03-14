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
    <div className = "authorization">
    <div className='autoriz'>РЕГИСТРАЦИЯ</div>
    <button className='buttonClose' onClick={()=>closePage()}></button>
    <div className='loginHandler'>
      <input className='input' placeholder='login' ref={newLog}></input>
      <input className='input' placeholder='user name' ref={userName}></input>
      <input className='input' placeholder='password' ref={newPass} type="password"></input>
      <input className='input' placeholder='repeat password' ref={repeatPass} type="password"></input>
      <button className='buttonEnter' onClick={()=>sendRegHendler()}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </div>
 </div>
  );
}
