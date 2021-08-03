import type { SpriteSheetLoaderOpts } from "../../loaders/spriteSheetLoader";
import type { ModelAnimationOpts } from "../../types_interfaces/abstract/genericUserModel";

export enum PunkSpritesAnims { 
  punkIdle = "punkIdle",
  punkRun = "punkRun",
  punkJump = "punkJump", 
  punkDoubleJump = "punkDoubleJump",
  punkAttackSpecial = "punkAttackSpecial", 
  punkAttackNormal = "punkAttackNormal", 
  punkAttackCharge = "punkAttackCharge" 
};

export const punkSpritesUrls = {
  [PunkSpritesAnims.punkIdle]: "assets/characters/punk/Punk_idle.png",
  [PunkSpritesAnims.punkRun]: "assets/characters/punk/Punk_run.png",
  [PunkSpritesAnims.punkJump]: "assets/characters/punk/Punk_jump.png",
  [PunkSpritesAnims.punkDoubleJump]: "assets/characters/punk/Punk_doublejump.png",
  [PunkSpritesAnims.punkAttackSpecial]: "assets/characters/punk/Punk_attack3.png",
  [PunkSpritesAnims.punkAttackNormal]: "assets/characters/punk/Punk_attack1.png",
  [PunkSpritesAnims.punkAttackCharge]: "assets/characters/punk/Punk_run attack.png"
};

export const punkSprites: SpriteSheetLoaderOpts = {
  sprites: [
    { spriteKey: PunkSpritesAnims.punkIdle, spriteUrl: punkSpritesUrls.punkIdle },
    { spriteKey: PunkSpritesAnims.punkRun, spriteUrl: punkSpritesUrls.punkRun },
    { spriteKey: PunkSpritesAnims.punkJump, spriteUrl: punkSpritesUrls.punkJump },
    { spriteKey: PunkSpritesAnims.punkDoubleJump, spriteUrl: punkSpritesUrls.punkDoubleJump },
    { spriteKey: PunkSpritesAnims.punkAttackSpecial, spriteUrl: punkSpritesUrls.punkAttackSpecial },
    { spriteKey: PunkSpritesAnims.punkAttackNormal, spriteUrl: punkSpritesUrls.punkAttackNormal },
    { spriteKey: PunkSpritesAnims.punkAttackCharge, spriteUrl:punkSpritesUrls.punkAttackCharge },
  ],
  frameWidth: 48,
  frameHeight: 48
};

export const punkAnimations: ModelAnimationOpts[] = [
  { key: PunkSpritesAnims.punkIdle, frameStart: 0, frameEnd: 3, repeat: true },
  { key: PunkSpritesAnims.punkRun, frameStart: 0, frameEnd: 5, repeat: true },
  { key: PunkSpritesAnims.punkJump, frameStart: 0, frameEnd: 3, repeat: true, frameRate: 10 },
  { key: PunkSpritesAnims.punkAttackNormal, frameStart: 0, frameEnd: 5, frameRate: 10, repeat: false },
  { key: PunkSpritesAnims.punkAttackSpecial, frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0 ], repeat: false },
  { key: PunkSpritesAnims.punkAttackCharge, frameStart: 0, frameEnd: 5, frameRate: 10, repeat: false }
];