import { useState } from 'react';

import Game from '../game/game';
import Chat from './chat/Chat.js';
import LobbyList from './lobby/LobbyList';

import '../startScreen/authorization.css';
import './menu.css';

export default function Header(props) {
  const { server, data, setData } = props;
  const [state, setState] = useState('menu');

  async function logout() {
    setData(await server.logout());
    // game.destroy(true, false);
    // game = null;
  }

  function gameStart() {
    setState('game');
  }

  function openChat() {
    setState(state === 'chat' ? 'menu' : 'chat');
  }
  
  // временно ===============
  function openLobbyList() {
    setState('lobby');
  }
  // временно ===============

  return (
    <div>
      {state === 'game' ? (
        <Game server={server} />
      ) : (
        <div>
        {state === 'lobby' ? (
          <LobbyList server={server} openMenu={(state) => setState(state)}/>
        ) : (
          <div className="menu">
            <div>
              {/* Временно =================================================*/}
              <button className="button" onClick={openLobbyList} >Лобби</button>
              {/* Временно =================================================*/}
              <button className="button" onClick={gameStart}>
                ИГРАТЬ
              </button>
              <button className="button">ПЕРСОНАЛИЗАЦИЯ</button>
              <button className="button">НАСТРОЙКИ</button>
              <button className="button" onClick={logout}>
                ВЫЙТИ
              </button>
              <button className="buttonChat" onClick={openChat}></button>
            </div>
            {state === 'chat' ? <Chat server={server} data={data}></Chat> : ''}
          </div>
        )}
        </div>
      )}
    </div>
  );
}
