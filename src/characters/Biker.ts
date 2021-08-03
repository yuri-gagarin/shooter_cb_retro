import { Scene } from "phaser";
// animations //
import { bikerAnimations } from "./sprites/bikerSprites";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel"

export class Biker extends GenericUserModel implements IGameCharacterModel {
  constructor (scene: Scene, sprite: CharacterSprite) {
    super(scene, sprite);
    this.initializeModelAnimations(bikerAnimations);
  };

  public update(): void {

  }
};