import Phaser from "phaser";

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
            this.ammo.setText(`${weapon.ammo} / ${weapon.maxAmmo}`)
        })
        game.events.on("shot", (ammo, maxAmmo)=>{
            this.ammo.setText(`${ammo} / ${maxAmmo}`)
        })
        game.events.on("showStats", (players) => {
            this.showStats(players);
        })
    }

    showStats(player) {
        
    }
}