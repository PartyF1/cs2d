import Phaser from "phaser";
import MainScene from "./MainScene";

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
         scene: [new MainScene(server)]
      }   
      
   }
   render() {
      return new Phaser.Game(this.config);
   }
}