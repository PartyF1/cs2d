import Phaser from "phaser";

export default class Cat extends Phaser.Animations.Animation {
    constructor(player, game) {
        super()
        this.texture = "catStay";
        this.ability = "wallJump";
        this.abilityTrigger = "jump";
        this.player = player;

        this.create({
            key: "run",
            frames: this.generateFrameNumbers("catRun", {start: 0, end: 8}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "stay",
            frames: this.generateFrameNumbers("catStay", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "jump",
            frames: this.generateFrameNumbers("catJump", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "rift",
            frames: this.generateFrameNumbers("catRift", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "useAbility",
            frames: this.generateFrameNumbers("catUseAbility", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "death",
            frames: this.generateFrameNumbers("catDeath", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })
    }

    useAbility() {
        if (this.player.body.touching.left) {
            this.player.setVelocity(200, -200)
        }
        else if (this.player.body.touching.rigth) {
            this.player.setVelocity(-200, -200);
        } 
        else if (this.player.body.touching.top) {
            this.player.setVelocityY(200);
        }
    }
}