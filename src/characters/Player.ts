import { Scene } from "phaser";
// animations //
import { punkAnimations } from "./sprites/punkSprites";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel";

export type CharacterSpriteOpts = {
  sprites: [ { spriteUrl: string; spriteKey: string; }];
  frameWidth: number;
  frameHeight: number;
}
export class Player extends GenericUserModel implements IGameCharacterModel {
  constructor ({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.initializeModelAnimations(punkAnimations)
  };
  public update(){
    
  }
};