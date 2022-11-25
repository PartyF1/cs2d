import Phaser from "phaser";

export default class fox extends Phaser.Animations.AnimationManager {
    constructor(player) {
        this.texture = "fox";
        this.ability = "prompt";
        this.abilityTrigger = "rift";
        this.player = player;

        this.create({
            key: "run",
            frames: this.generateFrameNumbers("foxRun", {start: 0, end: 10}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "stay",
            frames: this.generateFrameNumbers("foxStay", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "jump",
            frames: this.generateFrameNumbers("foxJump", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "rift",
            frames: this.generateFrameNumbers("foxRift", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "useAbility",
            frames: this.generateFrameNumbers("foxUseAbility", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })

        this.create({
            key: "death",
            frames: this.generateFrameNumbers("foxDeath", {start: 0, end: 6}),
            frameRate: 30,
            repeat: -1
        })
    }

    useAbility() {
        if(this.player.touching.down) {
            this.player.setScaleY(0.2);
        }
    }
}