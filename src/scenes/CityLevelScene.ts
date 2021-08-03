import Phaser from "../lib/phaser";
// models //
import { Character } from "../characters/Character";
// objects - platforms //
import { CityBoxes } from "../objects/CityBoxes";
import { CityBarrels } from "../objects/CityBarrels";
// animations //
import characterAnimations from "../animations/characterAnimations";
// types //
import { PunkAnimation } from "../types_interfaces/abstract/genericUserModel";
import { IObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";

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
  private attackKey: Phaser.Input.Keyboard.Key;
  private attackSpecialKey: Phaser.Input.Keyboard.Key;
  private attackChargeKey: Phaser.Input.Keyboard.Key;
  // objects //
  private cityBoxes: IObjectLoader;
  private cityBarrels: IObjectLoader;

  constructor() {
    super("cityLevelScene");
    this.cityBoxes = new CityBoxes(this);
    this.cityBarrels = new CityBarrels(this);
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
    // objects //
    this.cityBoxes.load();
    this.cityBarrels.load();
    // ANIMATIONS //
    // animations //
    this.load.spritesheet(PunkAnimation.punkIdle, "assets/characters/punk/Punk_idle.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkRun, "assets/characters/punk/Punk_run.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkJump, "assets/characters/punk/Punk_jump.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkDoubleJump, "assets/characters/punk/Punk_doublejump.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkAttackNormal, "assets/characters/punk/Punk_attack1.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkAttackSpecial, "assets/characters/punk/Punk_attack3.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet(PunkAnimation.punkAttackCharge, "assets/characters/punk/Punk_run_attack.png", { frameWidth: 48, frameHeight: 48 });
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
      { spriteKey: "punkIdle", xPos: 100, yPos: this.height - 100 }, 
      { size: { x: 24, y: 24 } }
    )
    .initialize(characterAnimations.PUNK_ANIMATIONS)
    .setScale(2).setOffset(0, 20);
    this.player.body.setAllowGravity(false);
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(10, this.height / 2 + 150, this.width * 4, 150));
    // fence foreground //
    

    this.cityBoxes.create([ this.player ]);
    this.cityBarrels.create([ this.player ]);

    // must be after all character models //
    this.setBackgrounds(
      { scene: this, imageKey: "cityBrick1" },
      { position: { posX: 0, posY: this.height + 30 },
        origin: { originX: 0, originY: 1 },
        scale: { scaleX: 2, scaleY: 1 },
        scrollFactor: { scrollFactorX: 1.25, scrollFactorY: 1.25 }
      }
    );

    // camera //
    this.cameras.main.setBounds(0, 0, this.width * 4, this.height);
    this.physics.world.setBounds(0, 0, this.width * 4, this.height);

    // follow player //
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // keys //
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.attackSpecialKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.attackChargeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update() {
    this.checkPlayerIdle();

    if (this.cursors.left.isDown) {
      this.player.flipX = true;
      this.player.setVelocityX(-200);
      this.player.setOffset(20, 20);
      this.player.anims.play(PunkAnimation.punkRun, true);
    } else if (this.cursors.right.isDown) {
      this.player.flipX = false;
      this.player.setVelocityX(200);
      this.player.setOffset(0, 20);
      this.player.anims.play(PunkAnimation.punkRun, true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play(PunkAnimation.punkJump, true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(100);
      this.player.anims.play(PunkAnimation.punkJump, true);
    } else if (this.attackKey.isDown) {
      this.player.anims.play(PunkAnimation.punkAttackNormal, true);
    } else if (this.attackSpecialKey.isDown) {
      this.player.anims.play(PunkAnimation.punkAttackSpecial, true);
    } else if (this.attackChargeKey.isDown) {
      this.player.anims.play(PunkAnimation.punkAttackCharge, true);
      this.slideCharacter(10, this.player);
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

    } while (currentBGSpan < ((this.width * 4) + 400))
  }

  private checkPlayerIdle(): void {
    if (!this.cursors.up.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.attackKey.isDown) {
      if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === PunkAnimation.punkAttackSpecial) {
        if (this.player.anims.isPlaying) {
          return;
        } else {
          this.player.anims.play(PunkAnimation.punkIdle);
        }
      } else if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === PunkAnimation.punkAttackNormal) {
        if (this.player.anims.isPlaying) {
          return;
        } else {
          this.player.anims.play(PunkAnimation.punkIdle);
        }
      } else if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === PunkAnimation.punkAttackCharge) {
        if (this.player.anims.isPlaying) {
          return;
        } else {
          this.player.anims.play(PunkAnimation.punkIdle);
        }
      } else if (this.player.anims.currentAnim && this.player.anims.currentAnim.key === PunkAnimation.punkIdle && this.player.anims.isPlaying) {
        return;
      } else {
        this.player.anims.play(PunkAnimation.punkIdle);
      }
    } else {
      return;
    } 
  }

  private slideCharacter(xValue: number, character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, interval?: number) {
    let timer: number = 0;
    const increment = interval ? interval : 100;
    const slider = character.flipX ? - 5 : 5;
    for (let i = 0; i < xValue; i += 5) {
      setTimeout(() => {
        character.setX(character.x + slider);
      }, timer);
      timer += increment;
    }
  }
};



