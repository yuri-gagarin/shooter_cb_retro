import { Scene } from "phaser"

export type SpriteSheetLoaderOpts = {
  sprites: Array<{ spriteUrl: string; spriteKey: string; }>;
  frameWidth: number;
  frameHeight: number;
}
export class SpriteSheetLoader {
  public static loadSprites(scene: Scene, { sprites, frameWidth, frameHeight }: SpriteSheetLoaderOpts): void {
    for (const spriteData of sprites) {
      scene.load.spritesheet(spriteData.spriteKey, spriteData.spriteUrl, { frameWidth, frameHeight });
    }
  }
};