import { Scene } from "phaser";

export interface IObjectLoader {
  load: () => void;
  create: (characters: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]) => void;
}
export abstract class GenericObjectLoader {
  protected scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }
}