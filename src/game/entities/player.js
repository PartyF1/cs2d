import Phaser from "phaser";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, coursor, mouse, character, bullets) {

        super(scene, x, y, character);
        this.setScale(2, 2);
        this.scene.add.existing(this);
        //-----------------------
        this.coursor = coursor;
        this.mouse = mouse;
        //---------------------
        this.canJump = true;
        this.bullets = bullets;

        this.canFire = true;
        this.haveWeapon = false;
        this.vector = null;
        this.weapon = null;
        this.action = 2;

    }

    //одиночный прыжок
    jump() {
        if (this.count < 2 && this.canJump) {
            this.setVelocityY(-500);
            this.count++;
        }
    }

    actionCheck() {
        if (this.coursor.action.isDown && this.action > 0) this.action--;
        else if (this.coursor.action.isUp) this.action = 2;
    }
    
    getVector() {
        return new Phaser.Math.Vector2(this.mouse.worldX - this.body.center.x, this.mouse.worldY - this.body.center.y);
    };

    view() {
        this.vector = this.getVector();
        this.flipX = this.mouse.worldX < this.body.center.x ? true : false;   
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

    gunMove() {
        if (this.weapon) {
            this.vector.setLength(22);
            this.weapon.rotation = Math.atan2(this.vector.y, this.vector.x);
            this.weapon.setPosition(this.body.center.x + this.vector.x, this.body.center.y + this.vector.y + 5)
            this.weapon.flipY = this.flipX? true : false;

        }
    }


    update() {
        this.movement();
        this.jumping();

        this.gunMove();
        this.view();
        this.actionCheck()
    }
}