import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rotation = null, player = null, mouse = null, id = null) {
        super(scene, x, y, "bullet");              
        this.id = id;
        this.player = player;
        this.rotation = rotation;
        this.uniqId = Math.floor(Math.random()*10000)+1;
        this.scale = 0.05;
        if (this.player) {
            this.mouse = mouse;
            this.playerId = player.id;
            this.vector = new Phaser.Math.Vector2(this.mouse.worldX - this.player.body.center.x, this.mouse.worldY - this.player.body.center.y);
            this.rotation = Math.atan2(this.vector.y, this.vector.x);
            this.vector.setLength(player.weapon.bulletSpeed);
            this.xs = this.vector.x;
            this.ys = this.vector.y;
            this.dist = 1;
            this.maxDist = player.weapon.range;
        }
        this.scene.add.existing(this);  
    }
}