export default class Server {
  constructor() {
    this.token = null;
    this.chatHash = null;
    this.lobbyHash = null;
    this.gamer = null;
  }

  async send(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    if (this.gamer) {
      params.matchId = this.gamer.matchId
    }
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const result = await fetch(`http://cs2d?${query}`);
    const answer = await result.json();
    return answer.result === 'ok' ? answer.data : null;
  }

  async postSend(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const responce = await fetch("http://cs2d?", {
      method: "POST",
      headers: {
        "Content-Type": "application.json"
      }, 
      body: JSON.stringify(params)
    })
    const answer = await responce.json();
    return answer?.result === "ok"? answer.data : null;
  }

  async login(login, password) {
    if (login && password) {
      const data = await this.send({ method: 'login', login, password });
      this.token = data.token;
      delete data.token;
      return data;
    }
    return null;
  }

  async registration(login, password, userName) {
    return await this.send({method: 'registration', login, password, userName})
  }

  async logout() {
      return await this.send({ method: 'logout'});
  }

  async getMessages(hash){
    return await this.send({method: 'getMessages', hash});
  } 

  async getLobbys() {
    return await this.send({ method: 'getAllLobby' })
  }

  async sendMessage(name, message) {
    return await this.send({ method: 'sendMessage', name, message});
  }

  async createLobby() {
    return await this.send({ method: 'createLobby', mode: "time", map: "city", amountPlayers: 8 })
  }

  async joinToLobby(id) {
    return await this.send({method: "joinToLobby", id})
  }

  async deleteLobby() {
    return await this.send({method: "deleteLobby"})
  }

  async leaveLobby(id) {
    return await this.send({method: "leaveLobby", id})
  }

  async getGamer() {
    const data =  await this.send({method: "getGamer"})
    if (data) {
      this.gamer = data;
      return true;
    }
    return false;
  }

  async startMatch() {
    return await this.send({method: "startMatch"})
  }

  async updateScene(bullets, playerPosition, weapons) {
    return await this.postSend({bullets, playerPosition, weapons})
  }
}
