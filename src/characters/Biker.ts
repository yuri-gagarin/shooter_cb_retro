import { Scene, Tilemaps } from "phaser";
// animations //
import { bikerAnimations, BikerSpritesAnims } from "./sprites/bikerSprites";
// classes //
import { GenericUserModel } from "../types_interfaces/abstract/genericUserModel";
// types //
import type { CharacterSprite, IGameCharacterModel } from "../types_interfaces/abstract/genericUserModel";
import type  { Player } from "./Player";

export class Biker extends GenericUserModel implements IGameCharacterModel {
  constructor ({ scene, sprite }: { scene: Scene, sprite: CharacterSprite }) {
    super(scene, sprite);
    this.initializeModelAnimations(bikerAnimations);
    this.model.flipX = true;
  };

  public update(player: Player): void {
    if (this.model.flipX) this.model.setOffset(20, 20);
    else this.model.setOffset(0, 20);
    console.log(this.scene.cameras.main.scrollX + 820)
    if ((this.scene.cameras.main.scrollX + 800) > this.model.x) {
      if (Phaser.Math.Distance.Between(player.getModel().x, player.getModel().y, this.model.x, this.model.y) < 300) {
        this.standAndAttack(player);
      } else if (Phaser.Math.Distance.Between(player.getModel().x, player.getModel().y, this.model.x, this.model.y) < 600) {
        this.moveBiker();
      } else {
        this.animateIdle();
      }
    }
  }

  public getModel(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.model;
  }

  private animateIdle(): void {
    if(this.model.body.acceleration.x === 0) this.model.anims.play(BikerSpritesAnims.bikerIdle, true);
    //if (this.model.body.acceleration.x)this.model.anims.play(BikerSpritesAnims.bikerIdle, true);
  }

  private moveBiker(): void {
    if (this.model.flipX) {
      this.model.setAccelerationX(-50);
      this.model.anims.play(BikerSpritesAnims.bikerRun, true);
    } else {
      this.model.setAccelerationX(50);
      this.model.anims.play(BikerSpritesAnims.bikerRun, true);
    }

    if (this.model.body.touching.left) {
      this.model.flipX = false;
      this.model.setAccelerationX(50);
      this.model.anims.play(BikerSpritesAnims.bikerRun, true);
    }

    if (this.model.body.touching.right) {
      this.model.flipX = true;
      this.model.setAccelerationX(-50);
      this.model.anims.play(BikerSpritesAnims.bikerRun, true);
    }

  }

  private standAndAttack(player: Player): void {
    if (this.model.x > player.getModel().x) {
      this.model.flipX = true;
    } else if (this.model.x < player.getModel().x) {
      this.model.flipX = false;
    }
    this.model.setVelocity(0, 0);
    this.model.anims.play(BikerSpritesAnims.bikerAttack2, true);
  }
};