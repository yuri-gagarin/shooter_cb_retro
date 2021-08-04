import type { SpriteSheetLoaderOpts } from "../../loaders/spriteSheetLoader";
import type { ModelAnimationOpts } from "../../types_interfaces/abstract/genericUserModel";

export enum LaserSpritesAnims {
  laserFlameRed = "laserFlameRed",
  laserFlameViolet = "laserFlameViolet",
  laserFlamePurple = "laserFlamePurple",
  laserFlameBlue = "laserFlameBlue",
  laserFlameLightBlue = "laserFlameLightBlue",
  laserFlameLightGreen = "laserFlameLightGreen",
  laserFlameBrightGreen1 = "laserFlameBrightGreen1",
  laserFlameBrightGreen2 = "laserFlameBrightGreen2",
  laserFlameYellow = "laserFlameYellow"
};
export enum LaserAnimEffects {
  redYellowLaser = "redYellowLaser",
  bluePurpleLAser = "bluePurpleLaser",
  greenYellowLaser = "greenYellowLaser"
};
 
export const laserSpritesUrls = {
  [LaserSpritesAnims.laserFlameRed]: "assets/weapons/lasers/02.png",
  [LaserSpritesAnims.laserFlameViolet]: "assets/weapons/lasers/03.png",
  [LaserSpritesAnims.laserFlamePurple]: "assets/weapons/lasers/04.png",
  [LaserSpritesAnims.laserFlameBlue]: "assets/weapons/lasers/05.png",
  [LaserSpritesAnims.laserFlameLightBlue]: "assets/weapons/lasers/06.png",
  [LaserSpritesAnims.laserFlameLightGreen]: "assets/weapons/lasers/07.png",
  [LaserSpritesAnims.laserFlameBrightGreen1]: "assets/weapons/lasers/08.png",
  [LaserSpritesAnims.laserFlameBrightGreen2]: "assets/weapons/lasers/09.png",
  [LaserSpritesAnims.laserFlameYellow]: "assets/weapons/lasers/10.png"
};

export const laserSprites: SpriteSheetLoaderOpts = {
  sprites: [
    { spriteKey: LaserSpritesAnims.laserFlameRed, spriteUrl: laserSpritesUrls.laserFlameRed },
    { spriteKey: LaserSpritesAnims.laserFlameViolet, spriteUrl: laserSpritesUrls.laserFlameViolet },
    { spriteKey: LaserSpritesAnims.laserFlamePurple, spriteUrl: laserSpritesUrls.laserFlamePurple },
    { spriteKey: LaserSpritesAnims.laserFlameBlue, spriteUrl: laserSpritesUrls.laserFlameBlue },
    { spriteKey: LaserSpritesAnims.laserFlameLightBlue, spriteUrl: laserSpritesUrls.laserFlameLightBlue },
    { spriteKey: LaserSpritesAnims.laserFlameLightGreen, spriteUrl: laserSpritesUrls.laserFlameLightGreen },
    { spriteKey: LaserSpritesAnims.laserFlameBrightGreen1, spriteUrl: laserSpritesUrls.laserFlameBrightGreen1 },
  ],
  frameWidth: 127,
  frameHeight: 123
};
/*
export const laserAnimations: ModelAnimationOpts[] = [
  { key: LaserSpritesAnims.laserFlameRed, frameStart: 0, frameEnd: 0, frameRate: 10 },
  { key: LaserSpritesAnims.laserFlameViolet, frameStart: 0, frameEnd: 0, frameRate: 10 },
  { key: LaserSpritesAnims.laserFlamePurple, frameStart: 0, frameEnd: 7, frameRate: 10 },
  { key: LaserSpritesAnims.laserFlameBlue, frameStart: 0, frameEnd: 5, frameRate: 10 },
  { key: LaserSpritesAnims.laserFlameLightBlue, frames: [ 0, 1, 0, 1, 0, 1, 0 ], frameRate: 10 },
  { key: LaserSpritesAnims.laserFl, frameStart: 0, frameEnd: 3, repeat: true },
  { key: LaserSpritesAnims.bikerRun, frameStart: 0, frameEnd: 5, repeat: true, frameRate: 10 }
];
*/
