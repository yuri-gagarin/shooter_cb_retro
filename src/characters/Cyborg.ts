import { Scene } from "phaser";
// animations //
import { cyborgAnimations, CyborgSpritesAnims } from "./sprites/cyborgSprites";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel"

enum Direction { "UP", "RIGHT", "DOWN", "LEFT" }
export class Cyborg extends GenericUserModel implements IGameCharacterModel {
  constructor ({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.initializeModelAnimations(cyborgAnimations);
  };

  public update(): void {
    if ((this.scene.cameras.main.scrollX  + 800) > this.model.x) {
      this.animateIdle();
    }
  }

  private animateIdle(): void {
    this.model.anims.play(CyborgSpritesAnims.cyborgIdle, true);
  }
};