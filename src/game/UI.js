import Phaser from "phaser";
import Player from "./entities/player";

export default class UI extends Phaser.Scene {
    constructor(player) {
        super("ui");
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.player = player;
    }

    create()
    {
        this.scene.run("ui")
        const game = this.scene.get("mainScene");
        this.weapon = this.add.text(this.w-200, this.h-150, "", {
			fontSize: 32
		})
        this.ammo = this.add.text(this.w-200, this.h-100, "", {
			fontSize: 32
		})
        game.events.on("takeWeapon", (weapon)=>{
            this.weapon.setText(weapon.name);
            this.ammo.setText("Ammo: " + weapon.ammo)
        })
        game.events.on("shot", (ammo)=>{
            this.ammo.setText("Ammo: " + ammo)
        })
    }
}