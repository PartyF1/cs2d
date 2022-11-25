import React from "react";

export default function AccessibleLobby(props) {
  const { lobby, joinToLobby } = props;

  const join = () => {
    joinToLobby(lobby.id);
  }

  return (
    <div>
      <div className="lobbyId">{lobby.id}</div>
      <div className="playersCount">{lobby.amountPlayers}/{lobby.maxAmountPlayers}</div>
      <button onClick={join}>Присоединиться</button>
    </div>
  );
}