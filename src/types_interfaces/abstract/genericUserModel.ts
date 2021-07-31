import { Scene } from "phaser";

export type PunkAnimation = "punkIdle" | "punkRun" | "punkJump" | "punkAttackShoot";

export type ModelAnimationOpts = {
  key: PunkAnimation;
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
  spriteKey: string;
}
export type CharacterOpts = {
  bounce?: { x?: number; y?: number };
  size?: { x?: number; y?: number };

}

export abstract class GenericUserModel {
  protected scene: Scene;
  protected model: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  constructor(scene: Scene, sprite: CharacterSprite, characterOpts?: CharacterOpts) {
    //const { bounce, size } = characterOpts ? characterOpts : {};
    this.scene = scene;
    this.initializeModelSprite(sprite);
    this.setBounce(characterOpts);
    this.setCustomSize(characterOpts);
  };

  private initializeModelSprite({ xPos, yPos, spriteKey }: CharacterSprite): void {
    this.model = this.scene.physics.add.sprite(xPos, yPos, spriteKey);
    this.model.setCollideWorldBounds(true);
  };
  private setBounce(characterOpts?: CharacterOpts): void {
    const { x = 0, y = 0 } = characterOpts && characterOpts.bounce ? characterOpts.bounce : {};
    this.model.setBounce(x, y);
  };
  private setCustomSize(characterOpts?: CharacterOpts): void {
    const { x = 0, y = 0 } = characterOpts && characterOpts.size ? characterOpts.size : { x: 0, y: 0 };
    if ( x > 0 && y > 0) this.model.setSize(x, y);
  };
};