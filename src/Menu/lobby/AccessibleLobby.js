import React from "react";

export default function AccessibleLobby(props) {
  const { lobby, server, connect } = props;

  const connectToLobby = () => {
    connect(lobby.id);
  }

  return (
    <div>
      <div className="lobbyId">{lobby.id}</div>
      <div className="playersCount">{lobby.players}</div>
      <button onClick={connectToLobby}>Присоединиться</button>
    </div>
  );
}