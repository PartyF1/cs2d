import { useState } from 'react';
import Chat from './Chat/Chat.js';
import './menu.css';

export default function Header(props) {
  const { server, userData, setUserData, setPage } = props;
  const [chatState, setChatState] = useState('closed');

  async function logout() {
    setUserData(await server.logout());
    setPage("StartScreen")
  }

  function gameStart() {
    setPage('Game');
  }

  function openChat() {
    setChatState(chatState === 'open' ? 'closed' : 'open');
  }

  function openLobbyList() {
    setPage('LobbyList');
  }

  return (
    <div className="menu">
      <div>
        <button className="button" onClick={openLobbyList}>ЛОББИ</button>
        <button className="button" onClick={logout}>ВЫЙТИ</button>
      </div>
      {chatState === 'open' ? <Chat server={server} userData={userData}></Chat> : ''}
    </div>
  )
}
