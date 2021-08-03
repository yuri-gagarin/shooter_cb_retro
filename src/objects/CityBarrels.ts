import Phaser from "../lib/phaser";
import { CityStreetObjects } from "../types_interfaces/enums/gameObjects";
import { GenericObjectLoader, IObjectLoader } from "../types_interfaces/abstract/genericObjectLoader";

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
export class CityBarrels extends GenericObjectLoader implements IObjectLoader {

  constructor(scene: Phaser.Scene) {
    super(scene);
  }
  public load() {
    this.scene.load.image(CityStreetObjects.barrelOpened, "assets/objects/Barrel1.png");
    this.scene.load.image(CityStreetObjects.barrelClosed, "assets/objects/Barrel2.png");
    this.scene.load.image(CityStreetObjects.barrelBroken, "assets/objects/Barrel3.png");
    this.scene.load.image(CityStreetObjects.barrelDestroyed, "assets/objects/Barrel4.png");
  }

  public create(characters: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]) {
    const firstBarrelSet = this.addObjectsToScene({
      spriteKey: CityStreetObjects.barrelOpened, colliders: characters, numberOfObjects: 2, width: 20, height: 10, posX: 750, posY: 550, scaleX: 2.5, scaleY: 2.5, offsetY: 20
    });
  }
};
