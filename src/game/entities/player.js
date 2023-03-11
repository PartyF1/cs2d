import Phaser from "phaser";




export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, id, coursor, mouse, bullets) {
        super(scene, x, y, "catStay");
        this.setDisplaySize(36, 50);
        this.scene.add.existing(this);
        //-----------------------
        this.name = name;
        this.id = id;
        this.coursor = coursor;
        this.mouse = mouse;
        this.count = 0;
        //---------------------
        this.canJump = true;
        this.bullets = bullets;

        this.canFire = true;
        this.haveWeapon = false;
        this.vector = null;
        this.weapon = null;
        this.action = 2;
        this.state = "alive"; // "alive", "dead", "respawn"//
        /*  В дальнейшем всё дерьмо можно будет переписать всё сюда, просто делая это через this.scene,
            в том числе выстрел, который не получилось сделать ранее(личное напоминание).
            Тогда она будет работать не как хуйня и даст намного более широкие возможности унификации,
            скажем, разгрузить главную сцену настолько, чтобы там не осталось нихрена, кроме объявления объектов
        this.coursor = this.scene.input.keyboard.addKeys(
            {
               up: Phaser.Input.Keyboard.KeyCodes.SPACE,
               down: Phaser.Input.Keyboard.KeyCodes.s,
               left: Phaser.Input.Keyboard.KeyCodes.A,
               right: Phaser.Input.Keyboard.KeyCodes.D,
               action: Phaser.Input.Keyboard.KeyCodes.E,
            }
         );
         */
    }

    //одиночный прыжок
    jump() {
        console.log(this.count, this.canJump)
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
            this.weapon.flipY = this.flipX ? true : false;
        }
    }

    /*dying() {
        if (this.state == "alive") {
            this.state = "dead";
            this.setActive(0);
            setTimeout(() => {
                this.respawn();
            }, 5000)
        }
    }

    respawn() {
        this.setX(window.outerWidth / 2);
        this.setY(window.outerHeight / 2 - 100);
        this.setActive(1);
        this.state = "respawn";
    }*/


    update() {
        this.movement();
        this.jumping();
        this.gunMove();
        this.view();
        this.actionCheck()
    }
}