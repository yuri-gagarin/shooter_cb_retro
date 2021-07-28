import'phaser';

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
        this.load.spritesheet("punkRunLeft", "assets/characters/punk/Punk_run_left.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkRunRight", "assets/characters/punk/Punk_run_right.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("punkJump", "assets/characters/punk/Punk_jump.png", { frameWidth: 48, frameHeight: 48 });

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
        // player //
        this.player  = this.physics.add.sprite(100, 450, "punkIdle");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.platforms);

        this.player.anims.create({ 
            key: "idle",
            frames: this.anims.generateFrameNumbers("punkIdle", { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        });

        this.player.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("punkRunLeft", { start: 5, end: 0 }),
            frameRate: 15,
            repeat: -1
        })
        this.player.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("punkRunRight", { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
        this.player.anims.create({
            key: "punkJump",
            frames: this.anims.generateFrameNumbers("punkJump", { start: 0, end: 4 }),
            frameRate: 15,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
    };

    update () {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        if (this.player.body.touching.down && this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
            this.player.anims.play("punkJump", true);
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
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: Demo
};

const game = new Phaser.Game(config);