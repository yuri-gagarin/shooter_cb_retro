import { Scene, Tilemaps } from "phaser";
import type { Player } from "../characters/Player";


export class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene, x: number, y: number, spriteTexture: string) {
    super(scene, x, y, spriteTexture);
  }

  public fire(x: number, y: number): void {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(300);
    console.log(this.body.allowGravity)
  }

  public preUpdate(t: number, d: number): void {
    super.preUpdate(t, d);
    if (this.x > this.scene.cameras.main.scrollX + 400) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
};

export class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Scene, spriteTexture: string) {
    super(scene.physics.world, scene);
    //
    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: spriteTexture,
    });
  }

  public fireLaser(model: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
    const laser = this.getFirstDead(false);
    if (laser) {
      const { x, y } = model.body;
      laser.fire(x, y)
    }
  }
}



/*
export class LaserGroup extends Phaser.Physics.Arcade.Group {
  public ownerClass: Player;
  constructor(scene: Scene) {
    super(scene.physics.world, scene);
    this.createLaserAnimations();
    ths
  }

  /*
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
*/