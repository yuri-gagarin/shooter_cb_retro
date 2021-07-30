import Phaser from "../lib/phaser";

export default class CityLevelScene extends Phaser.Scene {
  private width: number;
  private height: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("cityLevelScene");
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    // backgrounds //
    this.load.image("cbForeground", "assets/backgrounds/foreground.png");
    this.load.image("cbMidBuildings", "assets/backgrounds/back-buildings.png");
    this.load.image("cbFarBuildings", "assets/backgrounds/far-buildings.png");
    //
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(this.width * 0.5, this.height * 0.5, "cbFarBuildings").setScale(3.1).setScrollFactor(0.1);
    const mid = this.add.image(0, this.height * 0.9, "cbMidBuildings").setOrigin(0, 1).setScale(3).setScrollFactor(0.5);
    this.add.image(mid.width * 3, this.height * 0.9, "cbMidBuildings").setOrigin(0, 1).setScale(3).setScrollFactor(0.5);

    const front = this.add.image(0, this.height, "cbForeground").setOrigin(0, 1).setScale(2).setScrollFactor(1);
    this.add.image(front.width * 2, this.height, "cbForeground").setOrigin(0, 1).setScale(2).setScrollFactor(1);
    this.add.image(front.width * 4, this.height, "cbForeground").setOrigin(0, 1).setScale(2).setScrollFactor(1);
    // camera //
    this.cameras.main.setBounds(0, 0, this.width * 3, this.height);
  }

  update() {
    const mainCam = this.cameras.main;
    const cameraSpeed = 3;

    if (this.cursors.left.isDown) {
      mainCam.scrollX -= cameraSpeed;
    } else if (this.cursors.right.isDown) {
      mainCam.scrollX += cameraSpeed;
    }
  }
};

