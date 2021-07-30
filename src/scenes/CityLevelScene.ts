import Phaser from "../lib/phaser";
import { Character } from "../characters/Character";

type BackgroundOpts = {
  position?: { posX?: number; posY?: number; };
  scale?: { scaleX?: number; scaleY?: number; };
  origin?: { originX?: number; originY?: number; };
  scrollFactor?: { scrollFactorX?: number; scrollFactorY?: number };
};

export default class CityLevelScene extends Phaser.Scene {
  private width: number;
  private height: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  // characters //
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("cityLevelScene");
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    // backgrounds //
    this.load.image("cbForeground", "assets/backgrounds/foreground.png");
    this.load.image("cbMidBuildings", "assets/backgrounds/back-buildings.png");
    this.load.image("cbFarBuildings", "assets/backgrounds/far-buildings.png");
    // city bricks //
    this.load.image("cityBrick1", "assets/tiles/bricks/city_brick1.png");
    // characters //
    this.load.spritesheet("punkIdle", "assets/characters/punk/Punk_idle.png", { frameWidth: 48, frameHeight: 48 });
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // main bacground image, should barely scroll //
    this.setBackgrounds(
      { scene: this, imageKey: "cbFarBuildings" }, 
      { origin: { originX: 0, originY: 0 }, 
        scale: { scaleX: 3.1, scaleY: 3.1 }, 
        scrollFactor: { scrollFactorX: 0.1, scrollFactorY: 0.1 } 
      }
    );
    // mid background city image, faster scroll //
    this.setBackgrounds(
      { scene: this, imageKey: "cbMidBuildings" },
      { position: { posX: 0, posY: this.height * 0.9 }, 
        origin: { originX: 0, originY: 1 }, 
        scale: { scaleX: 3, scaleY: 3 }, 
        scrollFactor: { scrollFactorX: 0.5, scrollFactorY: 0.5 } 
      }
    );
    // player bacground, should scroll with player //
    this.setBackgrounds(
      { scene: this, imageKey: "cbForeground" },
      { position: { posX: 0, posY: this.height * 0.97 }, 
        origin: { originX: 0, originY: 1 }, 
        scale: { scaleX: 2, scaleY: 2 }, 
        scrollFactor: { scrollFactorX: 1, scrollFactorY: 1 } 
      }
    );

    this.player = new Character
    (
      this, 
      { spriteKey: "punkIdle", xPos: 100, yPos: this.height - 20 }, 
      { size: { x: 24, y: 48 } }
    )
    .initialize()
    .setScale(2);
    this.player.body.setAllowGravity(false);
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(10, 500, this.width, 100));

    // fence foreground //
    // must be after all character models //
    this.setBackgrounds(
      { scene: this, imageKey: "cityBrick1" },
      { position: { posX: 0, posY: this.height + 30 },
        origin: { originX: 0, originY: 1 },
        scrollFactor: { scrollFactorX: 1.25, scrollFactorY: 1.25 }
      }
    );

    // camera //
    this.cameras.main.setBounds(0, 0, this.width * 4, this.height);
    this.physics.world.setBounds(0, 0, this.width * 4, this.height);

    // follow player //
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    const mainCam = this.cameras.main;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }


  }

  
  private setBackgrounds({ scene, imageKey }: { scene: Phaser.Scene; imageKey: string }, imageOpts?: BackgroundOpts): void {
    const { position = {}, scale = {}, origin = {}, scrollFactor = {} } = imageOpts ? imageOpts : {}
    // positioning //
    const { posX = 0, posY = 0 } = position;
    // scale //
    const { scaleX = 1, scaleY = 1 } = scale;
    // origin //
    const { originX = 0.5, originY = 0.5 } = origin;
    // scroll factor //
    const { scrollFactorX = 1, scrollFactorY = 1 } = scrollFactor;
    let currentBGSpan = posX;
    do {
      let bgImgTemp = scene.add.image(currentBGSpan, posY, imageKey)
        .setOrigin(0, 0)
        .setScale(scaleX, scaleY)
        .setOrigin(originX, originY)
        .setScrollFactor(scrollFactorX, scrollFactorY);
      currentBGSpan = currentBGSpan + (bgImgTemp.width * scaleX);

    } while (currentBGSpan < (this.width * 4))
  }
};



