import { Scene } from "phaser";

export type ObjectsSetArg = {
  spriteKey: string;
  colliders?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[];
  numberOfObjects: number;
  width: number;
  height: number;
  posX: number; 
  posY: number; 
  scaleX?: number; 
  scaleY?: number;
  offsetX?: number;
  offsetY?: number;
  immovable?: boolean;
  allowGravity?: boolean;
};

export interface IObjectLoader {
  load: () => void;
  create: (characters: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]) => void;
};

export abstract class GenericObjectLoader {
  protected scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  protected addObjectsToScene({ spriteKey, colliders, numberOfObjects, width, height, posX, posY, scaleX = 1, scaleY = 1, offsetX = 0.5, offsetY = 0.5, immovable = true, allowGravity = false }: ObjectsSetArg): Phaser.Physics.Arcade.Group {
    let objectX = posX;
    let objectY = posY;
    const objectGroup = this.scene.physics.add.group({ defaultKey: spriteKey, collideWorldBounds: true });
    for (let i = 0; i < numberOfObjects; i++) {
      objectGroup.create(objectX, objectY).setSize(width, height).setScale(scaleX, scaleY).setOffset(offsetX, offsetY).body.setAllowGravity(allowGravity).setImmovable(immovable);
      objectX = objectX + (width * scaleX);
    }
    console.log(objectGroup)
    console.log(colliders);
    if (colliders) this.scene.physics.world.addCollider(objectGroup, colliders);

    return objectGroup;
  }
  /*
  private settBoxes({ spriteKey, colliders, numberOfBoxes, posX, posY, width, height, scaleX = 1, scaleY = 1, offsetX = 0.5, offsetY = 0.5, immovable = true }: CityBoxSetArg): Phaser.Physics.Arcade.Group {
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
  */
};

