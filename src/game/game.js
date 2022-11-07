import { useEffect } from "react";
import Phaser from "phaser";
import MainScene from "./MainScene";

export default function Game(props) {
   const {server} = props;
   //let game;
   useEffect(() => {
      const config = {
         type: Phaser.AUTO,
         width: window.innerWidth,
         height: window.innerHeight,
         parent: "game",
         physics: {
            default: "arcade",
            arcade: {
               gravity: {y: 800},
               debug: true,
            }
         },
         scene: [MainScene]
      }
      new Phaser.Game(config)  
      //setState(true); 
   });
   return(<></>)
}