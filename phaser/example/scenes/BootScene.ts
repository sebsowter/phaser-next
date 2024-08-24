export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot")
  }

  protected preload() {
    this.load.setPath("../../mines/images")
  }

  protected create() {
    this.scene.start("Preloader")
  }
}
