import { useEffect, useState } from "react";
import AccessibleLobby from "./AccessibleLobby"
import "./lobby.css"

let lobbys = [];

export default function LobbyList(props) {
  const { server, setPage, userData, setLobbyId } = props;
  const [state, setState] = useState();



  async function getLobbys() {
    const lobbyData = await server.getLobbys();
    if (lobbyData) {
      lobbys = lobbyData;
      setState(!state);
    } 
  }

  async function joinToLobby(id, host = "") {
    const lobby = await server.joinToLobby(id); //Основная функция
    //const lobby = lobbys[0]; // Для проверки работоспособности и локального переключения на лобби
    if (lobby) {
      userData.lobbyStatus = host = "host"? host : "";
      setLobbyId(id);
      setPage("Lobby");
    }
  }

  async function createLobby() {
    const lobby = await server.createLobby();
    joinToLobby(lobby.id, "host");
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
    <div className="lobbyContainer">
      <h2>Список игр</h2>
      <div className="lobbysField">
        {lobbys.map((element, index) => {
          return (<AccessibleLobby key={index} lobby={element} server={server} joinToLobby={joinToLobby}></AccessibleLobby>)
        })}
      </div>
      <button onClick={createLobby}>Создать лобби</button>
      <button onClick={toMenu}>Главное меню</button>
    </div>
  );
}