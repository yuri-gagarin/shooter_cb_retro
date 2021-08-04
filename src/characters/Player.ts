import { Scene } from "phaser";
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel";
// animations //
import { punkAnimations, PunkSpritesAnims } from "./sprites/punkSprites";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import { LaserGroup } from "../effects/LaserFlame";
// import type { LaserFlame } from "../effects/LaserFlame";

export type CharacterSpriteOpts = {
  sprites: [ { spriteUrl: string; spriteKey: string; }];
  frameWidth: number;
  frameHeight: number;
}
export class Player extends GenericUserModel implements IGameCharacterModel {
  //private laserFlames: LaserFlame[] = [];
  private weaponEffects: LaserGroup[] = [];
  constructor ({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.initializeModelAnimations(punkAnimations)
  };


  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, attackKey: Phaser.Input.Keyboard.Key, attackSpecialKey: Phaser.Input.Keyboard.Key, attackChargeKey: Phaser.Input.Keyboard.Key){
    this.checkPlayerIdle(cursors, attackKey, attackSpecialKey, attackChargeKey);
    if (cursors.left.isDown) {
      this.model.flipX = true;
      this.model.setVelocityX(-200);
      this.model.setOffset(20, 20);
      this.model.anims.play(PunkSpritesAnims.punkRun, true);
    } else if (cursors.right.isDown) {
      this.model.flipX = false;
      this.model.setVelocityX(200);
      this.model.setOffset(0, 20);
      this.model.anims.play(PunkSpritesAnims.punkRun, true);
    } else if (cursors.up.isDown) {
      this.model.setVelocityY(-100);
      this.model.anims.play(PunkSpritesAnims.punkJump, true);
    } else if (cursors.down.isDown) {
      this.model.setVelocityY(100);
      this.model.anims.play(PunkSpritesAnims.punkJump, true);
    } else if (attackKey.isDown) {
      this.model.anims.play(PunkSpritesAnims.punkAttackNormal, true);
    } else if (attackSpecialKey.isDown) {
      this.model.anims.play(PunkSpritesAnims.punkAttackSpecial, true);
    } else if (attackChargeKey.isDown) {
      this.model.anims.play(PunkSpritesAnims.punkAttackCharge, true);
      this.slideCharacter(10, this.model);
    } else {
      this.model.setVelocityX(0);
      this.model.setVelocityY(0);
    }
  }

  public setWeaponEffects(weaponEffects: LaserGroup[]): void {
    this.weaponEffects = weaponEffects;
    this.weaponEffects[0].world.gravity.setTo(0, 0);
  }

  public fireAttack(): void {
    if (this.weaponEffects && this.weaponEffects[0]) {
      this.weaponEffects[0].fireLaser(this.model);
    } 
  }
  

  public getModel(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.model;
  }

  private slideCharacter(xValue: number, character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, interval?: number) {
    let timer: number = 0;
    const increment = interval ? interval : 100;
    const slider = character.flipX ? - 5 : 5;
    for (let i = 0; i < xValue; i += 5) {
      setTimeout(() => {
        character.setX(character.x + slider);
      }, timer);
      timer += increment;
    }
  }

  private checkPlayerIdle(cursors: Phaser.Types.Input.Keyboard.CursorKeys, attackKey: Phaser.Input.Keyboard.Key, attackSpecialKey: Phaser.Input.Keyboard.Key, attackChargeKey: Phaser.Input.Keyboard.Key): void {
    if (!cursors.up.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown && !attackKey.isDown) {
      if (this.model.anims.currentAnim && this.model.anims.currentAnim.key === PunkSpritesAnims.punkAttackSpecial) {
        if (this.model.anims.isPlaying) {
          return;
        } else {
          this.model.anims.play(PunkSpritesAnims.punkIdle);
        }
      } else if (this.model.anims.currentAnim && this.model.anims.currentAnim.key === PunkSpritesAnims.punkAttackNormal) {
        if (this.model.anims.isPlaying) {
          return;
        } else {
          this.model.anims.play(PunkSpritesAnims.punkIdle);
        }
      } else if (this.model.anims.currentAnim && this.model.anims.currentAnim.key === PunkSpritesAnims.punkAttackCharge) {
        if (this.model.anims.isPlaying) {
          return;
        } else {
          this.model.anims.play(PunkSpritesAnims.punkIdle);
        }
      } else if (this.model.anims.currentAnim && this.model.anims.currentAnim.key === PunkSpritesAnims.punkIdle && this.model.anims.isPlaying) {
        return;
      } else {
        this.model.anims.play(PunkSpritesAnims.punkIdle);
      }
    } else {
      return;
    } 
  }
};