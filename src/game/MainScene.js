import Phaser from "phaser";
import Bullet from "./entities/bullet.js";
import Player from "./entities/player.js"



export default class MainScene extends Phaser.Scene {
   constructor() {
      super("mainScene");

      this.bullets = [];

      this.centWidth = window.outerWidth / 2;
      this.centHeight = window.outerHeight / 2;
   }

   preload() {
      this.load.image("city", 'assets/City.jpg');
      this.load.image("ground", 'assets/ground.png');
      this.load.image("platform", 'assets/platform.png');
      this.load.spritesheet("girl", "assets/New Piskel-3.png.png", { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet("anim", "assets/New Piskel (1).png", { frameWidth: 32, frameHeight: 32 });
      this.load.image("gun", "assets/deagle.png");
      this.load.image("bullet", "assets/bullet.png");
   }

   create() {
      this.bg = this.add.tileSprite(this.centWidth, this.centHeight, 4000, 2250, "city").setScale(this.centWidth / 2000, this.centHeight / 1125);

      this.gun = this.physics.add.sprite(this.centWidth, this.centHeight, "gun").setScale(0.03);

      this.ground = this.physics.add.staticGroup()
      this.ground.create(this.centWidth, this.centHeight + 300, "ground");

      this.platform = this.physics.add.staticGroup();
      this.platform.create(this.centWidth, this.centHeight, "platform");

      this.coursor = this.input.keyboard.addKeys(
         {
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.s,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            action: Phaser.Input.Keyboard.KeyCodes.E,
         }
      );

      this.mouse = this.input.mousePointer;

      this.anims.create({
         key: 'run',
         frames: this.anims.generateFrameNumbers("anim", { start: 0, end: 10 }),
         frameRate: 30,
         repeat: -1
      });

      this.anims.create({
         key: 'stay',
         frames: this.anims.generateFrameNumbers("girl"),
         frameRate: 30,
         repeat: -1
      });

      this.player = this.physics.add.existing(new Player(this, this.centWidth, this.centHeight, this.coursor, this.mouse, "girl", this.bullets))

      this.physics.add.collider(this.player, this.platform);
      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(this.gun, this.platform);
      this.physics.add.collider(this.gun, this.ground);

      this.camera = this.cameras.main.startFollow(this.player);
   }


   //изменение пули в пространстве, либо её уничтожение при наборе предельной дальности
   setBallistic(bullet, index) {
      if ((bullet.dist > 50) || !bullet.body.touching.none) {
         bullet.destroy();
         this.bullets.splice(index, 1);
      } else {
         bullet.body.setVelocity(bullet.xs, bullet.ys)
         bullet.dist += 1;
      }
   }


   //Изменение положения всех пуль в мире
   allBulletsTraectory(bullets) {
      if (bullets.length > 0)
         bullets.forEach((bullet, index) => {
            this.setBallistic(bullet, index);
         });
   }

   //Следование заднего фона за игроком
   followBG() {
      this.bg.x = this.player.body.x;
      this.bg.y = this.player.body.y;
   }

   //регистрация выстрела для всех указанного игрока
   fire(player) {
      if (player.mouse.leftButtonDown() && player.haveWeapon && player.canFire) {
         this.bullets.push(this.physics.add.existing(new Bullet(this, player, this.mouse))) 
         player.canFire = false;
      }
      else if (this.mouse.leftButtonReleased()){
            player.canFire = true;
      }
      
   }

   update() {
      this.player.update();
      this.followBG();
      this.player.takeGun(this.gun);
      this.fire(this.player);
      this.allBulletsTraectory(this.bullets);
      
   }
}