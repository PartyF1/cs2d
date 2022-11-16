import { useEffect, useState } from "react";
import PlayerElement from "./playerElement"

export default function LobbyWindow(props) {
  const { lobby } = props;
  //const [state, setState] = useState();
  return (
    <div className="lobbyContainer">
      <div className="playersList">
        {lobby.players.map((element, index) => {
          return (<PlayerElement key={index} player={element}></PlayerElement>)
        })}
      </div>
      <button>Начать игру</button>
    </div>
  );
}
