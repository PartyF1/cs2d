import React from "react";

export default function AccessibleLobby(props) {
  const { lobby, server, joinToLobby } = props;

  const join = () => {
    joinToLobby(lobby.id);
  }

  return (
    <div>
      <div className="lobbyId">{lobby.id}</div>
      <div className="playersCount">{lobby.players}</div>
      <button onClick={join}>Присоединиться</button>
    </div>
  );
}