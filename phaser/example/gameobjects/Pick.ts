import { SceneEvent, TILE_TOTAL } from "../constants"

export class Pick extends Phaser.GameObjects.Container {
  private image: Phaser.GameObjects.Image
  private pickText: Phaser.GameObjects.Text
  private playText: Phaser.GameObjects.Text
  private multiplierText: Phaser.GameObjects.Text
  private selectText: Phaser.GameObjects.Text
  private timer!: Phaser.Time.TimerEvent

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.image = this.scene.add
      .image(0, 0, "pick")
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.setOpen(false)
        this.timer = this.scene.time.delayedCall(100, () => {
          this.emit(SceneEvent.CLICK_PICK)
        })
      })

    this.pickText = this.scene.add
      .text(0, -60, "PICK UP TO 23", {
        fontFamily: "__mont_913dab",
        fontSize: 17,
        color: "#ffe500",
      })
      .setOrigin(0.5)

    this.playText = this.scene.add
      .text(0, -32, "PLAY TILES", {
        fontFamily: "__komtit_11e80f",
        fontSize: 32,
      })
      .setOrigin(0.5)

    this.multiplierText = this.scene.add
      .text(0, 10, "More Tiles =\nHigher Multiplier", {
        fontFamily: "__mont_913dab",
        fontSize: 14,
        align: "center",
        color: "#b8b9c1",
      })
      .setOrigin(0.5)

    this.selectText = this.scene.add
      .text(0, 56, "SELECT TILES", {
        fontFamily: "__komtit_11e80f",
        fontSize: 16,
      })
      .setOrigin(0.5)

    this.scene.add
      .existing(this)
      .add(this.image)
      .add(this.pickText)
      .add(this.playText)
      .add(this.multiplierText)
      .add(this.selectText)
      .setOpen(false)
  }

  setOpen(value: boolean) {
    return this.setActive(value).setVisible(value)
  }

  setMultiplier(value: number) {
    this.multiplierText.setText(`x${value}`)

    return this
  }

  setNumberOfMines(numberOfMines: number) {
    this.pickText.setText(`PICK UP TO ${TILE_TOTAL - numberOfMines}`)

    return this
  }

  setTilesNumber(value: number) {
    this.pickText = this.scene.add
      .text(0, 46, `PICK UP TO ${value}`, {
        fontFamily: "__komtit_11e80f",
        fontSize: 20,
      })
      .setOrigin(0.5)

    return this
  }

  destroy(fromScene?: boolean) {
    this.timer?.destroy()

    super.destroy(fromScene)
  }
}
