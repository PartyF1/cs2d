import { useEffect, useState } from "react";
import AccessibleLobby from "./AccessibleLobby"
import Lobby from "./Lobby/Lobby";
import "./lobby.css"

let lobbys = [];

export default function LobbyList(props) {
  const { server, setPage, userData} = props;
  const [state, setState] = useState();
  const [lobbyPageState, setLobbyPageState] = useState("list");
  const [lobbyId, setLobbyId] = useState();

  async function getLobbys() {
    const lobbyData = await server.getLobbys();
    if (lobbyData && lobbyData != lobbys) {
      lobbys = lobbyData;
      setState(!state);
      return true;
    }
    return false;
  }

  async function joinToLobby(id, host = "") {
    const lobby = await server.joinToLobby(id); //Основная функция
    //const lobby = lobbys[0]; // Для проверки работоспособности и локального переключения на лобби
    if (lobby) {
      userData.lobbyStatus = host === "host" ? host : "";
      getLobbys();
      setLobbyId(id);
      setLobbyPageState("lobby");
    }
  }

  async function createLobby() {
    const lobby = await server.createLobby();
    joinToLobby(lobby, "host");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getLobbys();
    }, 500);
    return () => clearInterval(timer);
  })

  const toMenu = () => {
    setPage("Menu")
  }

  return (
    <div>
      {lobbyPageState === "list" ?
        <div className="lobbyContainer">
          <h2>Список игр</h2>
          <div className="lobbysField">
            {lobbys.map((element, index) => {
              return (<AccessibleLobby key={index} lobby={element} joinToLobby={joinToLobby}></AccessibleLobby>)
            })}
          </div>
          <button onClick={createLobby}>Создать лобби</button>
          <button onClick={toMenu}>Главное меню</button>
        </div> :
        lobbyPageState === "lobby" ? 
        <Lobby server={server} 
        lobbyId={lobbyId} 
        setLobbyId={setLobbyId} 
        setLobbyPageState={setLobbyPageState}
        userData={userData}
        lobbys={lobbys}
        getLobbys={getLobbys}
        setPage={setPage}
        /> : ""
      }
    </div>



  );
}