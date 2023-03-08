import Phaser from "phaser";
import Bullet from "../entities/bullet.js";
import Player from "../entities/player.js"
import Pistol from "../entities/weapons/pistol.js";
import BulletToFetch from "../entities/bulletToFetch.js";
import Cat from "../entities/characters/Cat"


export default class MainScene extends Phaser.Scene {
   constructor(server) {
      super({ key: "mainScene" });

      this.server = server;

      this.enemyPlayers = [];
      this.allBullets = [];
      this.myBullets = [];
      this.bulletsToFetch = [];
      this.weapons = [];
      this.staticObjects = [];

      this.centWidth = window.outerWidth / 2;
      this.centHeight = window.outerHeight / 2;
      this.a = true;
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
      this.player = this.physics.add.existing(new Player(
         this,
         this.centWidth - 300,
         this.centHeight,
         this.server.gamer.gamerName,
         this.server.gamer.id,
         this.coursor,
         this.mouse,
         this.myBullets
      ))
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
         this.bulletsToFetch[index].status = "destroy";
         this.enemyPlayers.forEach((player, index) => {
            if (this.hitTest(player, bullet)) {          
               this.updateScene(this.bulletsToFetch, this.player, player.id);
               player.destroy();
               this.enemyPlayers.splice(index, 1);
            }
         })
         this.updateScene(this.bulletsToFetch, this.player);
         this.bulletsToFetch.splice(index, 1);
         bullet.destroy();
         this.myBullets.splice(index, 1);
      } else {     
         this.bulletsToFetch[index].x = bullet.body.x;
         this.bulletsToFetch[index].y = bullet.body.y;
         this.updateScene(this.bulletsToFetch, this.player)
         bullet.dist += 1;
      }
   }

   hitTest(object1, object2) {
      var left1 = parseInt(object1.body.x);
      var left2 = parseInt(object2.body.x);
      var top1 = parseInt(object1.body.y);
      var top2 = parseInt(object2.body.y);
      var width1 = parseInt(object1.width);
      var width2 = parseInt(object2.width);
      var height1 = parseInt(object1.height);
      var height2 = parseInt(object2.height);
      var horTest = false;
      var verTest = false;
      if (((left1 >= left2) && (left1 <= left2 + width2)) || ((left2 >= left1) && (left2 <= left1 + width1))) { horTest = true; } if (((top1 >= top2) && (top1 <= top2 + height2)) || ((top2 >= top1) && (top2 <= top1 + height1))) {
         verTest = true;
      }
      if (horTest && verTest) {
         return true;
      }
      return false;
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
         const bullet = this.physics.add.existing(new Bullet(this, player.body.center.x, player.body.center.y, null, player, this.mouse));
         const bulletToFetch = new BulletToFetch(bullet.x, bullet.y, bullet.rotation, bullet.uniqId)
         bullet.playerId = this.player.id;
         this.physics.add.collider(bullet, this.platform);
         this.physics.add.collider(bullet, this.ground);
         this.enemyPlayers.forEach((enemy) => {
            this.physics.add.collider(enemy, bullet);
         })
         bullet.body.setVelocity(bullet.xs, bullet.ys);
         bullet.body.setGravityY(-800);
         this.myBullets.push(bullet);
         this.bulletsToFetch.push(bulletToFetch);
         this.updateScene(this.bulletsToFetch, this.player);
         bulletToFetch.status = "fly";
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

   updateBullets(bullets) {
      if (bullets?.length) {
         bullets.forEach(bullet => {
            if (bullet.gamerId != this.player.id) {
               const bull = this.allBullets.find(oldBullet => oldBullet.id === bullet.uniqId)
               if (bull) {
                  bull.setPosition(bullet.x - 0, bullet.y - 0)
               } else {
                  this.allBullets.push(this.physics.add.existing(new Bullet(this, bullet.x - 0, bullet.y - 0, bullet.rotation, null, null, bullet.uniqId)).setGravityY(-800));
               };
            };
         });
      }
      this.allBullets.forEach((bullet, index) => {
         const find = bullets.find(newBullet => newBullet.id = bullet.uniqId)
         if (!find) {
            bullet.destroy();
            this.allBullets.splice(index, 1);
         }
      })
   }

   updateEnemies(enemies) {
      if (enemies) {
         if (enemies.find(enemy => enemy.id === this.player.id)?.statusInMatch - 0 === 1) {
            this.enemyPlayers.forEach((player, index) => {
               const find = enemies.find(enemy => enemy.id === player.id);
               if (find) {
                  player.setPosition(find.X - 0, find.Y - 0);
                  player.setVelocity(0, 0);
               } else {
                  player.destroy();
                  this.enemyPlayers.splice(index, 1);
               }
            })
            enemies.forEach(enemy => {
               const find = this.enemyPlayers.find(player => player.id);
               if (!find) {
                  if (enemy.id != this.player.id && enemy.statusInMatch !== 1) {
                     const newEnemy = this.physics.add.existing(new Player(this, enemy.X - 0, enemy.Y - 0, enemy.gamerName, enemy.id))
                     newEnemy.setGravityY(-800);
                     this.enemyPlayers.push(newEnemy);
                  };
               }
            })
         }
      }
   }

   renderScene(enemies, bullets) {
      this.updateBullets(bullets);
      this.updateEnemies(enemies)
      /*this.weapons.setPosition((weapon) => {
         weapon.setPosition(weapon.x, weapon.y)
      })*/
   }


   async updateScene(bulletsToFetch, player, playerHit = null) {
      //const updatedScene = this.server.updateScene(this.myBullets, this.player.body.position.x, this.player.body.position.y, this.weapons);
      await this.server.updateScene({ bullets: bulletsToFetch, player: player, playerHit: playerHit, weapon: player.weapon, statusInMatch: player.state });
   }

   async getScene() {
      const scene = await this.server.getScene();
      if (scene) {
         this.renderScene(scene.gamers, scene.bullets)
         if (!scene.gamers.find((gamer) => gamer.id === this.server.gamer.id))
            this.player.dying();
      }
   }


   update(time, delta) {
      if (this.player.active) {
         this.player.update();
         this.updateScene(null, this.player);
      }
      this.followBG();
      this.takeGuns();
      this.fire(this.player);
      this.MyBulletsTraectory();
      this.getScene();
   }
}