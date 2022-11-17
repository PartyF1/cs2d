import Phaser from "phaser";

export default class UI extends Phaser.Scene {
    constructor() {
        super("UI", true);
        this.screenW = 100;
        this.screenH = 100;
        this.ammo = 0;
    }

    create() {
        this.info = this.add.text(this.screenW, this.screenH, "Ammo: ", { font: '48px Arial', fill: '#000000' });       
    }

    update() {
        const scene = this.scene.get("mainScene");
        scene.events.on("fire", () => {
            this.info.setText("Ammo: " + scene.player.weapon.ammo)
        }, this)
        console.log(this.ammo);
    }
}