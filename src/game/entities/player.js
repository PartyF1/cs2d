import Phaser from "phaser";
import Bullet from "./bullet";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, coursor, mouse, character, bullets, weapon = {bulletSpeed : 500}) {
        super(scene, x, y, character);
        this.setScale(2, 2);
        this.scene.add.existing(this);
        //-----------------------
        this.coursor = coursor;
        this.mouse = mouse;
        //---------------------
        this.canJump = true;
        this.bullets = bullets;
        this.weapon = weapon;
        this.canFire = true;
        this.haveWeapon = false;
    }

    //одиночный прыжок
    jump() {
        if (this.count < 2 && this.canJump) {
            this.setVelocityY(-500);
            this.count++;
        }
    }

    //Прыжки
    jumping() {
        if (this.coursor.up.isDown) {
            this.jump(this.count, this.canJump);
            this.canJump = false;
        } else if (this.coursor.up.isUp) {
            this.canJump = true
            if (this.body.touching.down) {
                this.count = 0;
            }
        }
        if (this.coursor.up.isDown && this.body.touching.up) {
            this.setVelocityY(500);
            this.count = 2;
            this.flipY = true;
        }
        if (this.body.touching.down) {
            this.flipY = false;
        }
    }

    //функция изменения координат персонажа и проигрывание соответствующей анимации
    run(direction = 1, speed = 160) {
        this.setVelocityX(direction * speed);
        this.flipX = direction !== 1;
        this.anims.play("run", true);
    }

    //Горизонтальное передвижение персонажа
    movement() {
        if (this.coursor.left.isDown) {
            this.run(-1);
        } else if (this.coursor.right.isDown) {
            this.run(1);
        } else {
            this.setVelocityX(0);
            this.anims.play("stay", true);
        }
    }

    //Взятие игроком оружия
    takeGun(gun) {
        if (this.body.hitTest(gun.x, gun.y) && this.coursor.action.isDown) {
            this.weapon = gun;
            this.canFire = true;
            this.haveWeapon = true;
            gun.destroy()
        }
    }


    update() {
        this.movement();
        this.jumping();
    }
}