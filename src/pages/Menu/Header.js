import { useState } from 'react';
import './menu.css';

export default function Header(props) {
  const { server, userData, setUserData, setPage } = props;

  async function logout() {
    setUserData(await server.logout());
    setPage("StartScreen")
  }

  function gameStart() {
    setPage('Game');
  }


  function openLobbyList() {
    setPage('LobbyList');
  }

  return (
    <div >
      <div className='logo'></div>
      <div className="menu">
        <button className="button" onClick={openLobbyList}>ЛОББИ</button>
        <button className="button" onClick={logout}>ВЫЙТИ</button>
      </div>
    </div>
  )
}
