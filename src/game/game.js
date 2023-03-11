import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import UI from "./scenes/UI";

export default class Game{ 
   constructor(server, gamer, setPage) {   
      this.gamer = server.gamer;
      this.config = {
         type: Phaser.CANVAS,
         width: window.innerWidth,
         height: window.innerHeight,
         parent: "game",
         physics: {
            default: "arcade",
            arcade: {
               gravity: { y: 800 },
            }
         },
         scene: [new MainScene(server, setPage), new UI()]
         
      }  
      this.game = null 
   }
   render() {
      this.game = new Phaser.Game(this.config);
   }
   destroy() {
      this.game.destroy(true, false);
      this.game = null;
   }
}