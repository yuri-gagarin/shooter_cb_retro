import { Scene } from "phaser";
// animations //
import { cyborgAnimations } from "./sprites/cyborgSprites";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel"

export class Cyborg extends GenericUserModel implements IGameCharacterModel {
  constructor ({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.initializeModelAnimations(cyborgAnimations);
  };

  public update(): void {

  }
};