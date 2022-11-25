import Phaser from "phaser";
import MainScene from "./MainScene";
import UI from "./UI";

export default class Game{ 
   constructor(server) {   
      this.config = {
         type: Phaser.AUTO,
         width: window.innerWidth,
         height: window.innerHeight,
         parent: "game",
         physics: {
            default: "arcade",
            arcade: {
               gravity: { y: 800 },
               debug: true,
            }
         },
         scene: [new MainScene(server), new UI()]
         
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