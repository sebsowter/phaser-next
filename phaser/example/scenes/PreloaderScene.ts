import { FontLoader } from "@/phaser/FontLoader"

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader")
  }

  protected preload() {
    this.load.setPath("../../mines/images/")
    this.load.image("board", "board_1x.png")
    this.load.image("cashout", "cashout_1x.png")
    this.load.image("nugget", "nugget_1x.png")
    this.load.image("pick", "pick_1x.png")
    this.load.spritesheet("sparkles", "sparkles_1x.png", {
      frameHeight: 32,
      frameWidth: 32,
    })
    this.load.spritesheet("tiles", "tiles_1x.png", {
      frameHeight: 128,
      frameWidth: 128,
    })
  }

  protected create() {
    this.anims.create({
      key: "reveal_prize",
      frameRate: 12,
      frames: this.anims.generateFrameNumbers("tiles", {
        frames: [5, 6, 7],
      }),
    })

    this.anims.create({
      key: "reveal_mine",
      frameRate: 12,
      frames: this.anims.generateFrameNumbers("tiles", {
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
    })

    this.scene.start("Game")
  }
}
