export class LoaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: "loader",
      active: false,
      visible: false,
    });
  }

  preload() {
    // Preload assets for GameScene
  }

  create() {
    this.scene.start("game");
  }
}
