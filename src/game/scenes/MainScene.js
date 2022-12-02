import Phaser from "phaser";
import Bullet from "../entities/bullet.js";
import Player from "../entities/player.js"
import Pistol from "../entities/weapons/pistol.js";
import Cat from "../entities/characters/Cat"




export default class MainScene extends Phaser.Scene {
   constructor(server) {
      super({ key: "mainScene" });

      this.server = server;

      this.enemyPlayers = [];
      this.allBullets = [];
      this.myBullets = [];
      this.weapons = [];
      this.staticObjects = [];

      this.centWidth = window.outerWidth / 2;
      this.centHeight = window.outerHeight / 2;
   }

   async loadTextures() {
      const textures = await this.server.getTextures();
      textures.forEach((texture) => {
         switch (texture.type) {
            case "image":
               this.load.image(texture.key, `./assets/${texture.key}`)
               break;
            case "sprite":
               this.load.spritesheet(texture.key, `./assets/${texture.key}`);
               break;
            default:
               break;
         }
      })
   }

   async addStaticObjects() {
      const objects = await this.server.getStaticObjects();
      objects.forEach((object) => {
         const newObject = this.physics.add.staticGroup();
         newObject.create(object.x, object.y, object.key);
         this.staticObjects.push(newObject);
      })
   }

   weaponCollisions() {
      this.weapons.forEach((weapon) => {
         this.staticObjects.forEach((staticObject) => {
            this.physics.add.collider(weapon, staticObject);
         })
      })
   }

   playerCollisions() {
      this.staticObjects.forEach((staticObject) => {
         this.physics.add.collider(this.player, staticObject);
      })
   }

   bulletCollisions(bullet) {
      this.staticObjects.forEach((staticObject) => {
         this.physics.add.collider(bullet, staticObject)
      })
   }

   allCollisions() {
      this.weaponCollisions();
      this.playerCollisions();
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
      this.load.spritesheet("catStay", "assets/catStay.png", { frameWidth: 18, frameHeight: 27 })
      this.load.spritesheet("catRun", "assets/catRun.png", { frameWidth: 20, frameHeight: 27 })
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
         frames: this.anims.generateFrameNumbers("catRun"),
         frameRate: 20,
         repeat: -1
      });

      this.anims.create({
         key: 'stay',
         frames: this.anims.generateFrameNumbers("catStay"),
         frameRate: 6,
         repeat: -1
      });
      this.player = this.physics.add.existing(new Player(this, this.centWidth - 300, this.centHeight, this.server.gamer.gamerName, this.coursor, this.mouse, this.myBullets,))
      this.getPlayers();

      this.physics.add.collider(this.player, this.platform);
      this.physics.add.collider(this.player, this.ground);
      this.weapons.forEach(weapon => {
         this.physics.add.collider(weapon, this.platform);
         this.physics.add.collider(weapon, this.ground);
      })

      this.camera = this.cameras.main.startFollow(this.player);
      this.scene.launch("ui", { player: this.player })
   }


   //изменение пули в пространстве, либо её уничтожение при наборе предельной дальности
   setBallistic(bullet, index) {
      if ((bullet.dist > bullet.maxDist) || !bullet.body.touching.none) {
         bullet.destroy();
         this.myBullets.splice(index, 1);
      } else {
         bullet.body.setVelocity(bullet.xs, bullet.ys)
         bullet.dist += 1;
      }
   }

   async getPlayers() {
      const players = await this.server.tempUpdate(this.player.body.x, this.player.body.y);
      players.forEach((player) => {
         const newEnemy = this.physics.add.existing(new Player(this, player.X*1, player.Y*1, player.gamerName))
         newEnemy.setGravityY(-800);
         this.enemyPlayers.push(newEnemy);
      })
   }


   //Изменение положения всех пуль игрока
   MyBulletsTraectory() {
      if (this.myBullets.length > 0)
         this.myBullets.forEach((bullet, index) => {
            this.setBallistic(bullet, index);
         });
   }

   //Следование заднего фона за игроком
   followBG() {
      this.bg.setPosition(this.player.body.x, this.player.body.y);
   }

   //регистрация выстрела для всех указанного игрока
   fire(player) {
      if (player.mouse.leftButtonDown() && player.haveWeapon && player.weapon?.canShot && player.weapon.ammo) {
         const bullet = this.physics.add.existing(new Bullet(this, player, this.mouse))
         this.physics.add.collider(bullet, this.platform);
         this.physics.add.collider(bullet, this.ground);
         this.myBullets.push(bullet);
         this.sound.play("pistolShot");
         player.weapon.ammo--;
         player.weapon.canShot = false;
         this.events.emit('shot', player.weapon.ammo, player.weapon.maxAmmo);
      }
      else if (this.mouse.leftButtonReleased() && player.weapon && !player.weapon.autoFire) {
         player.weapon.coolDown(true);
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
         this.events.emit('takeWeapon', player.weapon);
      }
   }

   takeGuns() {
      this.weapons.forEach((weapon, index) => {
         this.takeGun(weapon, index, this.player);
      })
   }

   renderScene(enemies) {
      /*this.allBullets.forEach((bullet) => {
         bullet.setPosition(bullet.x, bullet.y)
      })*/
      this.enemyPlayers.forEach((player) => {
         const currentPlayer = enemies.find(enemy => enemy.gamerName === player.name);
         if(currentPlayer) {
            player.setPosition(currentPlayer.X*1, currentPlayer.Y*1)
         }
      })
      /*this.weapons.setPosition((weapon) => {
         weapon.setPosition(weapon.x, weapon.y)
      })*/
   }


   async updateScene() {
      //const updatedScene = this.server.updateScene(this.myBullets, this.player.body.position.x, this.player.body.position.y, this.weapons);
      const updatedScene = await this.server.tempUpdate(this.player.body.center.x, this.player.body.center.y);
      if (updatedScene) {
         //this.weapons = updatedScene.weapons;
         //this.allBullets = updatedScene.bullets;
         this.renderScene(updatedScene);
      }
   }


   update(time = 16, delta = 60) {
      this.player.update();
      this.followBG();
      this.takeGuns();
      this.fire(this.player);
      this.MyBulletsTraectory();
      this.updateScene();
   }
}