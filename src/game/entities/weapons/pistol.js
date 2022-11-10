import Weapon from "./weapon";

export default class Pistol extends Weapon {
    constructor(scene, x, y) {
        super(scene, x, y, "pistol");
        this.setScale(0.03);
        this.flipX = true;
        this.fireRate = 500;
        this.ammo = 7;
        this.range = 50;
        this.bulletSpeed = 500;
        this.autoFire = false;
    }
}