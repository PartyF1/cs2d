import Phaser from 'phaser';

export default class Weapon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, fireRate, ammo, range, bulletSpeed, autoFire) {
        super(scene, x, y, name);
        this.scene.add.existing(this);
        //-------------------—
        this.name = name;
        this.fireRate = fireRate;
        this.ammo = ammo;
        this.range = range;
        this.bulletSpeed = bulletSpeed;
        this.autoFire = autoFire;
        //-------------------—
    }
}