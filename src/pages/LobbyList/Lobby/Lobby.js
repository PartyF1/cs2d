import { useState, useEffect } from "react";
let players = [];

export default function Lobby(props) {

  const { userData, server, lobbyId, setLobbyId, setLobbyPageState, lobbys, getLobbys, setPage } = props;
  const [state, setState] = useState();

  const findThisLobby = () => {
    return lobbys.find(lobby => lobby.id === lobbyId)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const update = getLobbys();
      if (update) {
        const lobby = findThisLobby();
        if (lobby !== -1) {
          players = lobby.players.split(",");
          setState(!state);
        }     
        else if (server.getGamer()) {
          startGame();
        } else leaveLobby()
      }
    }, 500);
    return () => clearInterval(timer);
  })

  const startGame = () => {
    setPage("Game");
  }


  async function startMatch() {
    await server.startMatch(lobbyId);
  }

  async function deleteLobby() {
    await server.deleteLobby();
    setLobbyId(null)
    setLobbyPageState("list");
  }

  async function leaveLobby() {
    await server.leaveLobby(lobbyId);
    setLobbyId(null)
    setLobbyPageState("list");
  }

  return (
    <div>
      <div className='playerList'>список игроков
        {players.map((user, i) => {
          return (
            <div key={i}>{user} </div>
          )
        })}
      </div>
      {userData.lobbyStatus === "host" ?
        <div>
          <button className="button" onClick={startMatch}>ИГРАТЬ</button>
          <button className="button" onClick={deleteLobby}>УДАЛИТЬ ЛОББИ</button>
        </div> :
        <div>
          <button className="button" onClick={leaveLobby}> ВЫЙТИ ИЗ ЛОББИ</button>
        </div>
      }
    </div>
  )
}
