import'phaser';
//
import { Character } from './characters/Character';
// types //
import type { ModelAnimationOpts } from './types_interfaces/abstract/genericUserModel';

export default class Demo extends Phaser.Scene
{
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        /*
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('libs', 'assets/libs.png');
        this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        this.load.glsl('stars', 'assets/starfields.glsl.js');
        */
        this.load.image("industrialDefault", "assets/backgrounds/industrial_default.png");
        this.load.image("xBoxTile", 'assets/tiles/IndustrialTile_02.png');
        this.load.image("ironXTile", "assets/tiles/IndustrialTile_36.png");
        // animations //
        this.load.spritesheet("punkIdle", "assets/characters/punk/Punk_idle.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkRun", "assets/characters/punk/Punk_run.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkJump", "assets/characters/punk/Punk_jump.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkDoubleJump", "assets/characters/punk/Punk_doublejump.png", { frameWidth: 48, frameHeight: 48 });


    }

    create ()
    {   
        /*
        this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);

        this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);

        this.add.image(400, 300, 'libs');

        const logo = this.add.image(400, 70, 'logo');
        
        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 3500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
        */
        this.add.image(400, 300, "industrialDefault").setScale(2);
        this.platforms = this.physics.add.staticGroup();

        let xPos = 16;
        for (let i = 0; i < 800; i += 30) {
            // this.add.sprite(xPos, 550, "xBoxTile");
            if (i === 120 || i === 150) {
                this.platforms.create(xPos, 550, "ironXTile");
                xPos += 32;
            } else {
                this.platforms.create(xPos, 550, "xBoxTile");
                xPos += 32;
            }
          
        }

        let xPos2 = 16;
        for (let j = 0; j < 800; j+= 30) {
            if (j === 120 || j === 150) {
                this.platforms.create(xPos2, 582, "ironXTile");
                xPos2 += 32;
            } else {
                this.platforms.create(xPos2, 582, "xBoxTile");
                xPos2 += 32;
            }
        }
        
        const playerAnimations: ModelAnimationOpts[] = [
            { key: "punkIdle", frameStart: 0, frameEnd: 3, repeat: true },
            { key: "punkRun", frameStart: 0, frameEnd: 5, repeat: true },
            { key: "punkJump", frameStart: 0, frameEnd: 4, repeat: true }

        ];        
        this.player = new Character
        (
            this, 
            { spriteKey: "punkIdle", xPos: 100, yPos: 450 }, 
            { size: { x: 24, y: 48 } }
        )
        .initialize(playerAnimations);

        this.physics.add.collider(this.player, this.platforms);


        this.cursors = this.input.keyboard.createCursorKeys();
        
    };

    update () {

        if (this.cursors.left.isDown) {
            this.player.flipX = true;
            this.player.setVelocityX(-100);
            if (this.player.body.onFloor) {
                this.player.anims.play("punkRun", true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.flipX = false;
            this.player.setVelocityX(100);
            if (this.player.body.onFloor) {
                this.player.anims.play("punkRun", true);
            }
        } else {
            if (this.player.body.onFloor()) {
                this.player.anims.play("punkIdle", true);
            } else {
                this.player.anims.play("punkJump", true);
            }
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-200);
        }
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
    },
    scene: Demo
};

const game = new Phaser.Game(config);