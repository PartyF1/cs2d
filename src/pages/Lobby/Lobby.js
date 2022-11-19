import { useState, useEffect } from "react";

let users = [];
let hash;

export default function Lobby(props) {

  const { userData, server, setPage, lobbyId, setLobbyId } = props;
  const [state, setState] = useState();

  async function getUsers() {
    const newUsers = await server.getUsers(hash);
    if (newUsers) {
      users = newUsers.users;
      hash = newUsers.hash;
      setState(!state);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getUsers();
    }, 500);
    return () => clearInterval(timer);
  })


  function startMatch() { }

  async function deleteLobby() {
    await server.deleteLobby(lobbyId);
    setLobbyId(null)
    setPage("LobbyList");
  }

  async function leaveLobby() {
    await server.leaveLobby(lobbyId);
    setLobbyId(null)
    setPage("LobbyList");
  }

  return (
    <div>
      <div className='playerList'>список игроков
        {users.map((user, i) => {
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
