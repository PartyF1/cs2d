import { useState } from 'react';
import StartScreen from './pages/StartScreen/StartScreen';
import Server from "./server";
import Authorization from "./pages/Authorisation/Authorization";
import Registration from "./pages/Registration/Registration";
import Header from './pages/Menu/Header';
import LobbyList from "./pages/LobbyList/LobbyList";
import GamePage from './pages/GamePage/GamePage';

import './App.css';


function AppMain({ server }) {
  const [userData, setUserData] = useState();
  const [page, setPage] = useState('StartScreen');

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
          <LobbyList userData={userData} server={server} setPage={setPage}/> :
        page === "Game" ? 
          <GamePage gamer={server.gamer} server={server} setPage={setPage}/> : ""
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
