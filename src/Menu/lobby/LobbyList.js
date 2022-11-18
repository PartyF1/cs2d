import { useEffect, useState } from "react";
import AccessibleLobby from "./AccessibleLobby"
import Lobby from "./LobbyWindow/lobby";
import "./lobby.css"

let lobbys = [{
  id: 423,
  players : 3,
  host: "Vasya"
}];

export default function LobbyList(props) {
  const { server, openMenu, data } = props;
  const [state, setState] = useState();



  async function getLobbys() {
    const lobbyData = await server.getLobbys();
    if (lobbyData) {
       lobbys = lobbyData.lobbys;
    }
    setState(!state);
  }

  async function connect(id) {
    const lobby = await server.connectById(id);
    const user = data.name == lobby.host? "host" : "";
    if (lobby) {
      return (
        <div>
          <Lobby id={id} server={server} user={user} onLobby={(state) => setState(state)}></Lobby>
        </div>
      )
    }
  }

  async function createLobby() {
    const lobby = await server.createLobby();
    connect(lobby.id);
  }

  useEffect(() => {
    setTimeout(() => {
       getLobbys();
    }, 1000)
  })

  return (
    <div className="lobbyContainer">
      <h2>Список игр</h2>
      <div className="lobbysField">
        {lobbys.map((element, index) => {
          return (<AccessibleLobby key={index} lobby={element} server={server} connect={connect}></AccessibleLobby>)
        })}
      </div>
      <button onClick={createLobby}>Создать лобби</button>
      <button onClick={openMenu}>Главное меню</button>
    </div>
  );
}
