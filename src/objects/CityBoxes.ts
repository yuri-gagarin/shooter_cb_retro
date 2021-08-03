import Phaser from "../lib/phaser";
import { CityStreetObjects } from "../types_interfaces/enums/gameObjects";
// types //
import { GenericObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";
import type { IObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";

type CityBoxSetArg = {
  spriteKey: string;
  colliders?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
  numberOfBoxes: number;
  width: number;
  height: number;
  posX: number; 
  posY: number; 
  scaleX?: number; 
  scaleY?: number;
  offsetX?: number;
  offsetY?: number;
  immovable?: boolean;
}

export class CityBoxes extends GenericObjectLoader implements IObjectLoader {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  public load() {
    this.scene.load.image(CityStreetObjects.boxWood1, "assets/objects/Box1.png");
    this.scene.load.image(CityStreetObjects.boxWood2, "assets/objects/Box2.png");
    this.scene.load.image(CityStreetObjects.boxPaperLg, "assets/objects/Box3.png");
    this.scene.load.image(CityStreetObjects.boxPaperSm, "assets/objects/Box4.png");
    this.scene.load.image(CityStreetObjects.boxPaperOpen, "assets/objects/Box5.png");
    this.scene.load.image(CityStreetObjects.boxPaperDamaged, "assets/objects/Box6.png");
    this.scene.load.image(CityStreetObjects.boxPaperDestroyed, "assets/objects/Box7.png");
    this.scene.load.image(CityStreetObjects.boxIron, "assets/objects/Box8.png");
  }
  public create(characters: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]) {
  
    const firstBoxSet = this.setBoxes({
      spriteKey: CityStreetObjects.boxIron, colliders: characters, numberOfBoxes: 3, posX: 0, posY: 550, width: 28, height: 20, scaleX: 1.5, scaleY: 1.5, offsetX: 4, offsetY: 10 
    })
    const secondBoxSet = this.setBoxes({
      spriteKey: CityStreetObjects.boxIron, colliders: characters, numberOfBoxes: 2, posX: 300, posY: 570, width: 28, height: 20, scaleX: 1.7, scaleY: 1.7, offsetX: 4, offsetY: 10 
    });
    //
    const thirdBoxSet = this.setBoxes({ 
      spriteKey: CityStreetObjects.boxIron, colliders: characters, numberOfBoxes: 3, posX: 500, posY: 500, width: 28, height: 20, scaleX: 1.2, scaleY: 1.4, offsetX: 4, offsetY: 10 
    });
    const thirdBoxSetTop = this.setBoxes({
      spriteKey: CityStreetObjects.boxPaperOpen, numberOfBoxes: 2, posX: 520, posY: 480, width: 28, height: 28, offsetY: 10 
    });
    const thirdBoxSetRight = this.setBoxes({
      spriteKey: CityStreetObjects.boxWood2, colliders: characters, numberOfBoxes: 1, posX: 600, posY: 505, width: 28, height: 18, offsetY: 10
    });
    // 
  }

  private setBoxes({ spriteKey, colliders, numberOfBoxes, posX, posY, width, height, scaleX = 1, scaleY = 1, offsetX = 0.5, offsetY = 0.5, immovable = true }: CityBoxSetArg): Phaser.Physics.Arcade.Group {
    let boxX = posX;
    let boxY = posY;
    const boxGroup = this.scene.physics.add.group({ defaultKey: spriteKey, collideWorldBounds: true });
    for (let i = 0; i < numberOfBoxes; i++) {
      boxGroup.create(boxX, boxY).setSize(width, height).setScale(scaleX, scaleY).setOffset(offsetX, offsetY).body.setAllowGravity(false).setImmovable(immovable);
      boxX = boxX + (width * scaleX);
    }

    if (colliders) this.scene.physics.world.addCollider(boxGroup, colliders);

    return boxGroup;
  }
};
