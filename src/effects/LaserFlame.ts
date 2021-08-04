import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel";
import type { CharacterSprite } from "../types_interfaces/abstract/genericUserModel";
import type { Scene } from "phaser";
import { LaserAnimEffects, LaserSpritesAnims } from "./sprites/laserSprites";



export class LaserFlame extends  GenericUserModel {
  constructor({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.createLaserAnimations();
  }

  private createLaserAnimations(): void {
    this.model.anims.create({
      key: LaserAnimEffects.redYellowLaser,
      frames: [ 
        { key: LaserSpritesAnims.laserFlameRed }, 
        { key: LaserSpritesAnims.laserFlameYellow }, 
        { key: LaserSpritesAnims.laserFlameViolet }
      ],
      frameRate: 15,
      repeat: -1
    });
    this.model.anims.create({
      key: LaserAnimEffects.greenYellowLaser,
      frames: [
        { key: LaserSpritesAnims.laserFlameLightGreen },
        { key: LaserSpritesAnims.laserFlameBrightGreen1 },
        { key: LaserSpritesAnims.laserFlamePurple },
        { key: LaserSpritesAnims.laserFlameYellow},
        { key: LaserSpritesAnims.laserFlameBrightGreen2 }
      ],
      frameRate: 15,
      repeat: -1
    });
    this.model.anims.create({
      key: LaserAnimEffects.bluePurpleLAser,
      frames: [
        { key: LaserSpritesAnims.laserFlameBlue },
        { key: LaserSpritesAnims.laserFlamePurple },
        { key: LaserSpritesAnims.laserFlameViolet },
        { key: LaserSpritesAnims.laserFlameLightBlue }
      ],
      frameRate: 15,
      repeat: -1
    });
  }
};
