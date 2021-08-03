import { Scene } from "phaser";
import { BikerSpritesAnims } from "../../characters/sprites/bikerSprites";
import { PunkSpritesAnims } from "../../characters/sprites/punkSprites";

export type ModelAnimationOpts = {
  key: PunkSpritesAnims | BikerSpritesAnims;
  spriteName?: string;
  frameStart?: number;
  frameEnd?: number;
  frameRate?: number;
  repeat?: boolean;
  frames?: number[];
};

export type CharacterSprite = {
  xPos: number;
  yPos: number;
  spriteKey: PunkSpritesAnims | BikerSpritesAnims;
};

export type CharacterOpts = {
  bounce?: { x?: number; y?: number };
  scale?: { x?: number; y?: number } | number;
  size?: { x?: number; y?: number };
  offset?: { x?: number; y?: number } | number;
  gravity?: { x?: number; y?: number } | boolean;
};

export interface IGameCharacterModel {
  update: () => void;
}
export abstract class GenericUserModel {
  protected scene: Scene;
  protected model: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor(scene: Scene, sprite: CharacterSprite) {
    //const { bounce, size } = characterOpts ? characterOpts : {};
    this.scene = scene;
    this.initializeModelSprite(sprite);
  };

  public initialize(characterOpts?: CharacterOpts): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    if (characterOpts) {
      // bounce options //
      const { x: bounceX = 0, y: bounceY = 0 } = characterOpts.bounce ? characterOpts.bounce : {};
      if (bounceX || bounceY) {
        this.model.setBounce(bounceX, bounceY);
      }
      // custom size options //
      const { x: customSizeX = null, y: customSizeY = null } = characterOpts.size ? characterOpts.size : {};
      if (customSizeX && customSizeY) this.model.setSize(customSizeX, customSizeY)
      // custom scale options //
      const scaleOpts = characterOpts.scale;
      if (scaleOpts) {
        if (typeof scaleOpts === "number") {
          this.model.setScale(scaleOpts);
        } else if (typeof scaleOpts === "object") {
          const { x = 1, y = 1} = scaleOpts;
          this.model.setScale(x, y);
        }
      }
      // custom offset opts //
      const offsetOpts = characterOpts.offset;
      if (offsetOpts) {
        if (typeof offsetOpts === "number") this.model.setOffset(offsetOpts);
        else if (typeof offsetOpts === "object" ) {
          const { x = 0, y = 0 } = offsetOpts;
          this.model.setOffset(x, y)
        }
      }
      // custom gravity opts //
      const gravityOpts = characterOpts.gravity;
      if (gravityOpts) {
        if (typeof gravityOpts === "boolean") this.model.body.setAllowGravity(gravityOpts);
      } else if (typeof gravityOpts === "object") {
        const { x = 0, y = 0 } = gravityOpts; 
        this.model.body.setAllowGravity(true).setGravity(x, y);
      } else {
        this.model.body.setAllowGravity(false);
      }
    }
    
    return this.model
  };

  protected initializeModelAnimations(modelAnimations?: Array<ModelAnimationOpts>): void {
    if (modelAnimations && modelAnimations.length > 0) {
      for (const animation of modelAnimations) {
        let self = this;
        let animationName: string = (animation.spriteName ? animation.spriteName : animation.key);
        let repeat = animation.repeat ? animation.repeat : false;
        const frameOpts: { frames?: number[]; start?: number; end?: number } = animation.frames ? { frames: animation.frames } : {};
        if (animation.frameStart && animation.frameEnd) {
          frameOpts.start = animation.frameStart;
          frameOpts.end = animation.frameEnd;
        }
        this.model.anims.create({
          key: animation.key,
          frames: self.model.anims.generateFrameNumbers(animationName, { ...frameOpts }),
          frameRate: animation.frameRate ? animation.frameRate : 15
        })
        if (repeat) this.model.anims.get(animationName).repeat = -1;
      }
    }
  };

  private initializeModelSprite({ xPos, yPos, spriteKey }: CharacterSprite): void {
    this.model = this.scene.physics.add.sprite(xPos, yPos, spriteKey);
    this.model.setCollideWorldBounds(true);
  };
  
  private setCustomSize(characterOpts?: CharacterOpts): void {
    const { x = 0, y = 0 } = characterOpts && characterOpts.size ? characterOpts.size : { x: 0, y: 0 };
    if ( x > 0 && y > 0) this.model.setSize(x, y);
  };
};