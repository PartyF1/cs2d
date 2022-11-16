import React from "react";

export default function Lobby(props) {
  const { lobby, server } = props;
  return (
    <div>
      <div className="lobbyId">{lobby.id}</div>
      <div className="playersCount">{lobby.players}</div>
      <button onClick={server.joinToLobby}>Присоединиться</button>
    </div>
  );
}