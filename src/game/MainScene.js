import Phaser from "phaser";
import Bullet from "./entities/bullet.js";
import Player from "./entities/player.js"
import Pistol from "./entities/weapons/pistol.js";
import Weapon from "./entities/weapons/weapon.js";



export default class MainScene extends Phaser.Scene {
   constructor(server) {
      super("mainScene");

      this.server = server;

      this.bullets = [];
      this.weapons = [];

      this.centWidth = window.outerWidth / 2;
      this.centHeight = window.outerHeight / 2;
   }

   preload() {
      this.load.image("city", 'assets/City.jpg');
      this.load.image("ground", 'assets/ground.png');
      this.load.image("platform", 'assets/platform.png');
      this.load.spritesheet("girl", "assets/New Piskel-3.png.png", { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet("anim", "assets/New Piskel (1).png", { frameWidth: 32, frameHeight: 32 });
      this.load.image("pistol", "assets/deagle.png");
      this.load.image("bullet", "assets/bullet.png");
      this.load.audio("pistolShot", "audio/sound/pistol.mp3");
   }

   create() {
      this.bg = this.add.tileSprite(this.centWidth, this.centHeight, 4000, 2250, "city").setScale(this.centWidth / 2000, this.centHeight / 1125);

      this.weapons.push(this.physics.add.existing(new Pistol(this, this.centWidth, this.centHeight)))
      this.weapons.push(this.physics.add.existing(new Pistol(this, this.centWidth + 100, this.centHeight)))
      this.weapons.push(this.physics.add.existing(new Pistol(this, this.centWidth - 100, this.centHeight)))


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
      this.weapons.forEach(weapon => {
         this.physics.add.collider(weapon, this.platform);
         this.physics.add.collider(weapon, this.ground);
      })

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
      this.bg.setPosition(this.player.body.x, this.player.body.y);
   }

   //регистрация выстрела для всех указанного игрока
   fire(player) {
      if (player.mouse.leftButtonDown() && player.haveWeapon && player.canFire) {
         const bullet = this.physics.add.existing(new Bullet(this, player, this.mouse))
         this.physics.add.collider(bullet, this.platform);
         this.physics.add.collider(bullet, this.ground);
         this.bullets.push(bullet);
         this.sound.play("pistolShot");
         player.canFire = false;
      }
      else if (this.mouse.leftButtonReleased()) {
         player.canFire = true;
      }
   }

   //Взятие игроком оружия
   takeGun(gun, index, player) {
      if (player.body.hitTest(gun.x, gun.y) && this.coursor.action.isDown && player.action) {
         console.log(player.action)
         if (player.haveWeapon) {
            const tempWeapon = player.weapon;
            tempWeapon.setGravityY(0);
            player.weapon = null
            this.weapons.push(this.physics.add.existing(tempWeapon));
         }
         player.weapon = this.physics.add.existing(gun);
         this.weapons.splice(index, 1)
         player.weapon.setGravityY(-800);
         player.canFire = true;
         player.haveWeapon = true;
      }
   }

   takeGuns() {
      this.weapons.forEach((weapon, index) => {
         this.takeGun(weapon, index, this.player);
      })
   }

   update() {
      this.player.update();
      this.followBG();
      this.takeGuns();
      this.fire(this.player);
      this.allBulletsTraectory(this.bullets);
   }
}