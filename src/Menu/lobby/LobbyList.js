import { useEffect, useState } from "react";
import Lobby from "./lobby"
import "./lobby.css"

export default function LobbyList(props) {
  const { server, openMenu } = props;
  const [state, setState] = useState();

  let lobbys = [{
    name : "Artemka zahodi",
    players : 3
  }];

  async function getLobbys() {
    const lobbyData = await server.getLobbys();
    if (lobbyData) {
       lobbys = lobbyData.lobbys;
    }
    setState(!state);
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
          return (<Lobby key={index} lobby={element} server={server}></Lobby>)
        })}
      </div>
      <button onClick={server.createLobby}>Создать лобби</button>
      <button onClick={openMenu}>Главное меню</button>
    </div>
  );
}
