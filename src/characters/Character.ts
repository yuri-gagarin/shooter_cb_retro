import { Scene } from "phaser";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel";
// types //
import type { CharacterSprite, CharacterOpts, ModelAnimationOpts } from "../types_interfaces/abstract/genericUserModel";

export class Character extends GenericUserModel {
  constructor (scene: Scene, sprite: CharacterSprite, playerOpts?: CharacterOpts) {
    super(scene, sprite, playerOpts);
  };

  public initialize(modelAnimations?: Array<ModelAnimationOpts>): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    if (modelAnimations && modelAnimations.length > 0) {
      for (const animation of modelAnimations) {
        let self = this;
        let animationName = animation.spriteName ? animation.spriteName : animation.key;
        let repeat = animation.repeat ? animation.repeat : false;
        this.model.anims.create({
          key: animation.key,
          frames: self.model.anims.generateFrameNumbers(animationName, { start: animation.frameStart, end: animation.frameEnd }),
          frameRate: animation.frameRate ? animation.frameRate : 15
        })
        if (repeat) this.model.anims.get(animationName).repeat = -1;
      }
    }
    return this.model;
  };
};