import type { SpriteSheetLoaderOpts } from "../../loaders/spriteSheetLoader";
import type { ModelAnimationOpts } from "../../types_interfaces/abstract/genericUserModel";

export enum BikerSpritesAnims {
  bikerAttack1 = "bikerAttack1",
  bikerAttack2 = "bikerAttack2",
  bikerAttack3 = "bikerAttack3",
  bikerDeath = "bikerDeath",
  bikerHurt = "bikerHurt",
  bikerIdle = "bikerIdle",
  bikerRun = "bikerRun",
};

export const bikerSpritesUrls = {
  [BikerSpritesAnims.bikerAttack1]: "assets/characters/biker/Biker_attack1.png",
  [BikerSpritesAnims.bikerAttack2]: "assets/characters/biker/Biker_attack2.png",
  [BikerSpritesAnims.bikerAttack3]: "assets/characters/biker/Biker_attack3.png",
  [BikerSpritesAnims.bikerDeath]: "assets/characters/biker/Biker_death.png",
  [BikerSpritesAnims.bikerHurt]: "assets/characters/biker/Biker_hurt.png",
  [BikerSpritesAnims.bikerIdle]: "assets/characters/biker/Biker_idle.png",
  [BikerSpritesAnims.bikerRun]: "assets/characters/biker/Biker_run.png"
};

export const bikerSprites: SpriteSheetLoaderOpts = {
  sprites: [
    { spriteKey: BikerSpritesAnims.bikerAttack1, spriteUrl: bikerSpritesUrls.bikerAttack1 },
    { spriteKey: BikerSpritesAnims.bikerAttack2, spriteUrl: bikerSpritesUrls.bikerAttack2 },
    { spriteKey: BikerSpritesAnims.bikerAttack3, spriteUrl: bikerSpritesUrls.bikerAttack3 },
    { spriteKey: BikerSpritesAnims.bikerDeath, spriteUrl: bikerSpritesUrls.bikerDeath },
    { spriteKey: BikerSpritesAnims.bikerHurt, spriteUrl: bikerSpritesUrls.bikerHurt },
    { spriteKey: BikerSpritesAnims.bikerIdle, spriteUrl: bikerSpritesUrls.bikerIdle },
    { spriteKey: BikerSpritesAnims.bikerRun, spriteUrl: bikerSpritesUrls.bikerRun },
  ],
  frameWidth: 48,
  frameHeight: 48
};

export const bikerAnimations: ModelAnimationOpts[] = [
  { key: BikerSpritesAnims.bikerAttack1, frameStart: 0, frameEnd: 5, frameRate: 10 },
  { key: BikerSpritesAnims.bikerAttack2, frameStart: 0, frameEnd: 7, frameRate: 10 },
  { key: BikerSpritesAnims.bikerAttack3, frameStart: 0, frameEnd: 7, frameRate: 10 },
  { key: BikerSpritesAnims.bikerDeath, frameStart: 0, frameEnd: 5, frameRate: 10 },
  { key: BikerSpritesAnims.bikerHurt, frames: [ 0, 1, 0, 1, 0, 1, 0 ], frameRate: 10 },
  { key: BikerSpritesAnims.bikerIdle, frameStart: 0, frameEnd: 3, repeat: true },
  { key: BikerSpritesAnims.bikerRun, frameStart: 0, frameEnd: 5, repeat: true, frameRate: 10 }
];
