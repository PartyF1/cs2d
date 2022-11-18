import { useState } from "react";

let users;
let hash;

export default function Lobby(props) {

  const { server, id, user, onLobby } = props;
  const [state, setState] = useState();

  

  async function getUsers() {
    const newUsers = await server.getUsers(hash);
    if (newUsers) {
      users = newUsers.users;
      hash = newUsers.hash;
    }
    setState(!state);
  }

  setTimeout(()=> {
    getUsers();
  }, 1000)

  function play() {}

  async function deleteLobby() {
    await server.deleteLobby(id);
    onLobby();
  }

  async function exit() {
    await server.exitLobby(id);
    onLobby();
  }

  function options() {
    if (user == "host") {
      return (
        <div>
        <button className="button" onClick={play}>
          ИГРАТЬ
        </button>
        <button className="button" onClick={deleteLobby}>
          УДАЛИТЬ ЛОББИ
        </button>
      </div>
      )
    }
    else {
      return (
        <div>
        <button className="button" onClick={exit}>
          ВЫЙТИ ИЗ ЛОББИ
        </button>
      </div>
      )
    }
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
      {options}
    </div>
  )
}
