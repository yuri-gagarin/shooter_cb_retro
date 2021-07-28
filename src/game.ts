import'phaser';

export default class Demo extends Phaser.Scene
{
    private platforms: Phaser.Physics.Arcade.StaticGroup;
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