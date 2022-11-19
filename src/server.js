export default class Server {
  constructor() {
    this.token = null;
    this.chatHash = null;
    this.lobbyHash = null;
  }

  async send(params = {}) {
    if (this.token) {
      params.token = this.token;
    }
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const result = await fetch(`http://cs2d?${query}`);
    const answer = await result.json();
    return answer.result === 'ok' ? answer.data : null;
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

  async sendMessage(name, message) {
    return await this.send({ method: 'sendMessage', name, message});
  }

  async getLobbys() {
    return await this.send({ method: 'getLobbys' })
  }

  async createLobby() {
    return await this.send({ method: 'createLobby' })
  }

  async joinToLobby(id) {
    return await this.send({method: "joinToLobby", id})
  }

  async deleteLobby(id) {
    return await this.send({method: "deleteLobby", id})
  }

  async leaveLobby(id) {
    return await this.send({method: "leaveLobby", id})
  }
  async getUsers(id) {
    return await this.send({method: "getUsers", id})
  }
}
