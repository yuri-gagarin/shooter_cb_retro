import type { SpriteSheetLoaderOpts } from "../../loaders/spriteSheetLoader";
import type { ModelAnimationOpts } from "../../types_interfaces/abstract/genericUserModel";

export enum CyborgSpritesAnims {
  cyborgAttack1 = "cyborgAttack1",
  cyborgAttack2 = "cyborgAttack2",
  cyborgAttack3 = "cyborgAttack3",
  cyborgDeath = "cyborgDeath",
  cyborgHurt = "cyborgHurt",
  cyborgIdle = "cyborgIdle",
  cyborgRun = "cyborgRun",
};

export const cyborgSpritesUrls = {
  [CyborgSpritesAnims.cyborgAttack1]: "assets/characters/cyborg/Cyborg_attack1.png",
  [CyborgSpritesAnims.cyborgAttack2]: "assets/characters/cyborg/Cyborg_attack2.png",
  [CyborgSpritesAnims.cyborgAttack3]: "assets/characters/cyborg/Cyborg_attack3.png",
  [CyborgSpritesAnims.cyborgDeath]: "assets/characters/cyborg/Cyborg_death.png",
  [CyborgSpritesAnims.cyborgHurt]: "assets/characters/cyborg/Cyborg_hurt.png",
  [CyborgSpritesAnims.cyborgIdle]: "assets/characters/cyborg/Cyborg_idle.png",
  [CyborgSpritesAnims.cyborgRun]: "assets/characters/cyborg/Cyborg_run.png"
};

export const cyborgSprites: SpriteSheetLoaderOpts = {
  sprites: [
    { spriteKey: CyborgSpritesAnims.cyborgAttack1, spriteUrl: cyborgSpritesUrls.cyborgAttack1 },
    { spriteKey: CyborgSpritesAnims.cyborgAttack2, spriteUrl: cyborgSpritesUrls.cyborgAttack2 },
    { spriteKey: CyborgSpritesAnims.cyborgAttack3, spriteUrl: cyborgSpritesUrls.cyborgAttack3 },
    { spriteKey: CyborgSpritesAnims.cyborgDeath, spriteUrl: cyborgSpritesUrls.cyborgDeath },
    { spriteKey: CyborgSpritesAnims.cyborgHurt, spriteUrl: cyborgSpritesUrls.cyborgHurt },
    { spriteKey: CyborgSpritesAnims.cyborgIdle, spriteUrl: cyborgSpritesUrls.cyborgIdle },
    { spriteKey: CyborgSpritesAnims.cyborgRun, spriteUrl: cyborgSpritesUrls.cyborgRun },
  ],
  frameWidth: 48,
  frameHeight: 48
};

export const cyborgAnimations: ModelAnimationOpts[] = [
  { key: CyborgSpritesAnims.cyborgAttack1, frameStart: 0, frameEnd: 5, frameRate: 10 },
  { key: CyborgSpritesAnims.cyborgAttack2, frameStart: 0, frameEnd: 7, frameRate: 10 },
  { key: CyborgSpritesAnims.cyborgAttack3, frameStart: 0, frameEnd: 7, frameRate: 10 },
  { key: CyborgSpritesAnims.cyborgDeath, frameStart: 0, frameEnd: 5, frameRate: 10 },
  { key: CyborgSpritesAnims.cyborgHurt, frames: [ 0, 1, 0, 1, 0, 1, 0 ], frameRate: 10 },
  { key: CyborgSpritesAnims.cyborgIdle, frameStart: 0, frameEnd: 3, repeat: true },
  { key: CyborgSpritesAnims.cyborgRun, frameStart: 0, frameEnd: 5, repeat: true }
];
