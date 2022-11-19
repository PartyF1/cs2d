import { useState } from 'react';
import StartScreen from './pages/StartScreen/StartScreen';
import Server from "./server";
import Authorization from "./pages/Authorisation/Authorization";
import Registration from "./pages/Registration/Registration";
import Header from './pages/Menu/Header';
import LobbyList from "./pages/LobbyList/LobbyList";
import Lobby from "./pages/Lobby/Lobby";
import GamePage from './pages/GamePage/GamePage';

import './App.css';

function AppMain({ server }) {
  const [userData, setUserData] = useState();
  const [page, setPage] = useState('StartScreen');
  const [lobbyId, setLobbyId] = useState();

  return (
    <div className="App">
      {
        page === 'StartScreen' ? 
          <StartScreen setPage={setPage}/> :
        page === 'Authorisation' ? 
          <Authorization setUserData={setUserData} server={server} setPage={setPage}/> :
        page === 'Registration' ? 
          <Registration setUserData={setUserData} server={server} setPage={setPage}/> :
        page === "Menu" ? 
          <Header setUserData={setUserData} userData={userData} server={server} setPage={setPage} /> :
        page === "LobbyList" ?
          <LobbyList userData={userData} server={server} setPage={setPage} setLobbyId={setLobbyId}/> :
        page === "Lobby" ? 
          <Lobby userData={userData} server={server} setPage={setPage} lobbyId={lobbyId} setLobbyId={setLobbyId}/> : 
        page === "Game" ? 
          <GamePage userData={userData} server={server} setPage={setPage}/> : ""
      }
    </div>
  );
}

function App() {
  const server = new Server();
  return (
    <>
      <AppMain server={server} />
    </>
  );
}

export default App;
