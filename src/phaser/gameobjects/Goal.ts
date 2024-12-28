export class Goal extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, facing: number) {
    super(scene, x - facing * 32, y, "goal");

    this.scene.add
      .existing(this)
      .setFlipX(facing < 0)
      .setDepth(8);
  }
}
