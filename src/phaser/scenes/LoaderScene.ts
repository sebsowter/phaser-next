export class LoaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
      active: false,
      visible: false,
    });
  }

  preload() {}

  create() {
    this.scene.start("game");
  }
}
