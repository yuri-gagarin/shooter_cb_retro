import Phaser from "../lib/phaser";
import { CityStreetObjects } from "../types_interfaces/enums/gameObjects";
// types //
import { GenericObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";
import type { IObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";

type CityBoxSetArg = {
  spriteKey: string;
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
    /*
    const first = this.scene.add.image(100, 500, CityStreetObjects.boxIron).setScale(2);
    const second = this.scene.add.image(first.x + first.width*2, 500, CityStreetObjects.boxIron).setScale(2);

    console.log(first.input.hitArea)
    const platforms = this.scene.physics.add.staticGroup()
    platforms.add(first);
    platforms.add(second);
    this.scene.physics.world.addCollider(platforms, characters);
    console.log(this.scene.cameras.main.width);
    */
    const ironBoxGroup = this.scene.physics.add.group({ defaultKey: CityStreetObjects.boxIron, collideWorldBounds: true });


    (function(scene: Phaser.Scene) {
      const boxWidth = 28;
      const boxHeight = 20
      //ironBoxGroup.create(100, 550).setSize(boxWidth, boxHeight, true).setScale(1.5).setOffset(4, 10).body.setAllowGravity(false).setImmovable(true);
      //ironBoxGroup.create(100 + (boxWidth * 1.5), 550).setSize(boxWidth, boxHeight, true).setScale(1.5).setOffset(0, 10).body.setAllowGravity(false).setImmovable(true);

      let posX = 100;
      for (let i = 0; i < 3; i++) {
        ironBoxGroup.create(posX, 550).setSize(boxWidth, boxHeight, true).setScale(1.5).setOffset(4, 10).body.setAllowGravity(false).setImmovable(true);
        posX = posX + (boxWidth * 1.5);
        console.log(posX)
      }
      scene.physics.add.collider(ironBoxGroup, characters);

    })(this.scene);

    const secondBoxSet = this.setBoxes({ 
      spriteKey: CityStreetObjects.boxIron, numberOfBoxes: 2, posX: 500, posY: 480, width: 28, height: 20, scaleX: 1.5, scaleY: 1.5, offsetX: 4, offsetY: 10 
    });
    const thirdBoxSet = this.setBoxes({
      spriteKey: CityStreetObjects.boxIron, numberOfBoxes: 2, posX: 300, posY: 570, width: 28, height: 20, scaleX: 1.5, scaleY: 1.5, offsetX: 4, offsetY: 10 
    })
  }

  private setBoxes({ spriteKey, numberOfBoxes, posX, posY, width, height, scaleX = 1, scaleY = 1, offsetX = 0.5, offsetY = 0.5, immovable = true }: CityBoxSetArg): Phaser.Physics.Arcade.Group {
    let boxX = posX;
    let boxY = posY;
    const boxGroup = this.scene.physics.add.group({ defaultKey: spriteKey, collideWorldBounds: true });
    for (let i = 0; i < numberOfBoxes; i++) {
      boxGroup.create(boxX, boxY).setSize(width, height).setScale(scaleX, scaleY).setOffset(offsetX, offsetY).body.setAllowGravity(false).setImmovable(immovable);
      boxX = boxX + (width * scaleX);
    }
    return boxGroup;
  }
};
