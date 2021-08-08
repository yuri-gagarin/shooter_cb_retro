import Phaser from "../lib/phaser";
// models //
import { Player } from "../characters/Player";
import { Biker } from "../characters/Biker";
import { Cyborg } from "../characters/Cyborg";
// objects - platforms //
import { CityBoxes } from "../objects/CityBoxes";
import { CityBarrels } from "../objects/CityBarrels";
// animations //
import { punkSprites, PunkSpritesAnims } from "../characters/sprites/punkSprites";
import { cyborgSprites, CyborgSpritesAnims } from "../characters/sprites/cyborgSprites";
import { bikerSprites, BikerSpritesAnims } from "../characters/sprites/bikerSprites";
import { LaserAnimEffects } from "../effects/sprites/laserSprites";
// loaders //
import { SpriteSheetLoader } from "../loaders/spriteSheetLoader"; 
import { IObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";
import { LaserGroup } from "../effects/LaserFlame";
import { laserSprites, LaserSpritesAnims } from "../effects/sprites/laserSprites";
// types //

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
  private player: Player;
  private bikers: Biker[] = [];
  private cyborgs: Cyborg[] = [];

  private attackKey: Phaser.Input.Keyboard.Key;
  private attackSpecialKey: Phaser.Input.Keyboard.Key;
  private attackChargeKey: Phaser.Input.Keyboard.Key;
  private inputKeys: Phaser.Input.Keyboard.Key[] = [];

  // objects //
  private cityBoxes: IObjectLoader;
  private cityBarrels: IObjectLoader;
  // effects - weapons //
  private playerLaserGroup: LaserGroup;

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
    this.cursors = this.input.keyboard.createCursorKeys();
    // objects //
    this.cityBoxes.load();
    this.cityBarrels.load();
    // ANIMATIONS //
    // animations and spritesheets //
    // biker enemy //
    SpriteSheetLoader.loadSprites(this, punkSprites);
    SpriteSheetLoader.loadSprites(this, bikerSprites);
    SpriteSheetLoader.loadSprites(this, cyborgSprites);
    SpriteSheetLoader.loadSprites(this, laserSprites);
    // player //
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
    // general animations //
    this.anims.create({
      key: LaserAnimEffects.redYellowLaser,
      frames: [
        { key: LaserSpritesAnims.laserFlameRed, frame: 0 },
        { key: LaserSpritesAnims.laserFlameLightBlue, frame: 0 },
        { key: LaserSpritesAnims.laserFlameYellow, frame: 0 }
      ],
      frameRate: 15,
      repeat: -1
    });
    // player model //
    this.player = new Player({ scene: this, sprite: { spriteKey: PunkSpritesAnims.punkIdle, xPos: 100, yPos: this.height - 100 } })
      .initialize({ size: { x: 24, y: 24 }, scale: 2, offset: { x: 0, y: 20 } });
    this.player.getModel().body.setBoundsRectangle(new Phaser.Geom.Rectangle(10, this.height / 2 + 175, this.width * 4, 125));
    this.player.setWeaponEffects([ new LaserGroup(this, LaserSpritesAnims.laserFlameBlue) ])
    
    // enemies //
    // bikers //
    this.bikers.push(new Biker({ scene: this, sprite: { spriteKey: BikerSpritesAnims.bikerIdle, xPos: 720, yPos: this.height - 65 } })
      .initialize({ size: { x: 24, y: 24 }, scale: 2, offset: { x: 0, y: 20 } })
    );
    this.bikers.push(new Biker({ scene: this, sprite: { spriteKey: BikerSpritesAnims.bikerIdle, xPos: 830, yPos: this.height - 115 } })
      .initialize({ size: { x: 24, y: 24 }, scale: 2, offset: {x: 0, y: 20 } })
    );
    this.bikers.push(new Biker({ scene: this, sprite: { spriteKey: BikerSpritesAnims.bikerIdle, xPos: 1010, yPos: this.height - 115 } })
      .initialize({ size: { x: 24, y: 24 }, scale: 2, offset: {x: 0, y: 20 } })
    );
    // cyborgs //
    this.cyborgs.push(new Cyborg({ scene: this, sprite: { spriteKey: CyborgSpritesAnims.cyborgIdle, xPos: 1410, yPos: this.height - 115 } })
      .initialize({ size: { x: 24, y: 24 }, scale: 2, offset: {x: 0, y: 20 } })
    );

    // effects weapons //
    this.playerLaserGroup = new LaserGroup(this, LaserSpritesAnims.laserFlameBlue);
    // fence foreground ////
    const bikerModels = this.bikers.map((biker) => biker.getModel());
    this.cityBoxes.create([ this.player.getModel() ].concat(bikerModels));
    this.cityBarrels.create([ this.player.getModel() ].concat(bikerModels));

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
    this.cameras.main.startFollow(this.player.getModel(), true, 0.08, 0.08);

    // keys //
    this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.attackSpecialKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.attackChargeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.addEvents();
  }

  update() {
    this.player.update(this.cursors, this.attackKey, this.attackSpecialKey, this.attackChargeKey);
    // console.log(this.cameras.main.scrollX)
    for (const biker of this.bikers) {
      biker.update(this.player);
    }
    for (const cyborg of this.cyborgs) {
      cyborg.update();
    }

    for (const inputKey of this.inputKeys) {
      if (Phaser.Input.Keyboard.JustDown(inputKey)) {
        this.player.fireAttack();
      }
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

  private addEvents(): void {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    ];
  }
};



