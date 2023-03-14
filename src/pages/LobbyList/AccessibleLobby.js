import React from "react";
import "./accessibleLobby.css"

export default function AccessibleLobby(props) {
  const { lobby, joinToLobby } = props;

  const join = () => {
    joinToLobby(lobby.id);
  }

  return (
    <div className="accessibleLobby">
      LOBBY ID: <div className="lobbyId">{lobby.id}</div>
      ИГРОКИ: <div className="playersCount">{lobby.amountPlayers}/{lobby.maxAmountPlayers}</div>
      <button className = "button" onClick={join}>Присоединиться</button>
    </div>
  );
}