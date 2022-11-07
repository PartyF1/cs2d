import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, player, mouse) {  
        super(scene, player.body.center.x, player.body.center.y, "bullet"); 
        this.scene.add.existing(this);
        this.mouse = mouse;
        this.player = player;
        this.scale = 0.05;
        this.vector = new Phaser.Math.Vector2(this.mouse.worldX - this.player.body.center.x, this.mouse.worldY - this.player.body.center.y);
        this.rotation = Math.atan2(this.vector.y, this.vector.x);
        this.vector.setLength(500);
        this.xs = this.vector.x;
        this.ys = this.vector.y;
        this.dist = 1;
    }

}