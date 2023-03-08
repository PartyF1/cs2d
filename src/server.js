
export default class Server {
  constructor() {
    this.token = null;
    this.chatHash = null;
    this.lobbyHash = null;
    this.gamer = null;
    this.sceneHash = null;
  }

  
  async send(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const result = await fetch(`http://cs2d?${query}`);
    const answer = await result?.json();
    return answer.result === 'ok' ? answer.data : null;
  }

  async postSend(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const responce = await fetch(`http://cs2d?method=${params.method}`, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
    })
    //const answer = await responce?.json();
    //return answer?.result === "ok" ? answer.data : null;
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
    return await this.send({ method: 'registration', login, password, userName })
  }

  async logout() {
    return await this.send({ method: 'logout' });
  }

  async getMessages(hash) {
    return await this.send({ method: 'getMessages', hash });
  }

  async getLobbys() {
    const lobbys =  await this.send({ method: 'getAllLobby' });
    if (lobbys) {
      return lobbys;
    } else {
      return [];
    }
  }

  async sendMessage(name, message) {
    return await this.send({ method: 'sendMessage', name, message });
  }

  async createLobby() {
    return await this.send({ method: 'createLobby', mode: "time", map: "city", amountPlayers: 8 })
  }

  async joinToLobby(lobbyId) {
    return await this.send({ method: "joinToLobby", lobbyId })
  }

  async deleteLobby() {
    return await this.send({ method: "deleteLobby" })
  }

  async leaveLobby(lobbyId) {
    return await this.send({ method: "leaveLobby", lobbyId })
  }

  async getGamer() {
    this.gamer = await this.send({ method: "getGamer" });
    return this.gamer;
  }

  async startMatch(lobbyId, lobbyOwnerId, lobbyAmountPlayers, mode, map) {
    return await this.send({ method: "startMatch", lobbyId, lobbyOwnerId, lobbyAmountPlayers, mode, map })
  }

  async getScene() {
    const scene = await this.send({ method: "getScene", sceneHash: this.sceneHash })
    if (scene) {
      this.sceneHash = scene.sceneHash;
      return scene;
    }
    return false;
  }

  async updateScene(params) {
    return await this.postSend({method: "updateScene", ...params })
  }

  async leaveMatch() {
    return await this.send({method: "leaveMatch"})
  }

  async tempUpdate(X, Y) {
    return await this.send({ method: "updateScene", X, Y })
  }
}
