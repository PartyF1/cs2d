import Weapon from "./weapon";

export default class Pistol extends Weapon {
    constructor(scene, x, y) {
        super(scene, x, y, "pistol");
        this.setScale(0.03);
        this.flipX = true;
        this.name = "Pistol"
        this.fireRate = 500;
        this.maxAmmo = 400;
        this.ammo = this.maxAmmo;
        this.range = 50;
        this.bulletSpeed = 500;
        this.autoFire = false;
        this.canShot = true;
        this.inProgress = false
    }

    coolDown(fireBottonIsUp = false) {
        if (fireBottonIsUp && !this.canShot && !this.inProgress) {
            this.inProgress = true;
            setTimeout(() => {this.canShot=true; this.inProgress=false}, 200)
        }       
    }
}