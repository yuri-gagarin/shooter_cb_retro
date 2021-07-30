import Phaser from "./lib/phaser";
//
import { Character } from './characters/Character';
import CityLevelScene from "./scenes/CityLevelScene";
// types //
import type { ModelAnimationOpts } from './types_interfaces/abstract/genericUserModel';

/*
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
        this.load.image("industrialDefault", "assets/backgrounds/industrial_default.png");
        this.load.image("xBoxTile", 'assets/tiles/IndustrialTile_02.png');
        this.load.image("ironXTile", "assets/tiles/IndustrialTile_36.png");
        // backgrounds //
        this.load.image("cbForeground", "assets/backgrounds/foreground.png");
        this.load.image("cbMidBuildings", "assets/backgrounds/back-buildings.png");
        this.load.image("cbFarBuildings", "assets/backgrounds/far-buildings.png");
        // animations //
        this.load.spritesheet("punkIdle", "assets/characters/punk/Punk_idle.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkRun", "assets/characters/punk/Punk_run.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkJump", "assets/characters/punk/Punk_jump.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkDoubleJump", "assets/characters/punk/Punk_doublejump.png", { frameWidth: 48, frameHeight: 48 });


    }

    create ()
    {   
        const width = this.scale.width;
        const height = this.scale.height;

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
            { spriteKey: "punkIdle", xPos: 100, yPos: 40 }, 
            { size: { x: 24, y: 48 } }
        )
        .initialize(playerAnimations);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.world.setBounds(0, 0, 3392, 800);
        this.cameras.main.setBounds(0, 0, 3392, 100);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

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
*/

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
    scene: CityLevelScene
};

const game = new Phaser.Game(config);