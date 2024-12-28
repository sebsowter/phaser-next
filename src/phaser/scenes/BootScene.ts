export class BootScene extends Phaser.Scene {
  preload() {
    // Preload assets for LoaderScene
  }

  create() {
    this.scene.start("loader");
  }
}
