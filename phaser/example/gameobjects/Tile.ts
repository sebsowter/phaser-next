import { SceneEvent } from "../constants"

export enum TileState {
  INIT,
  CLICKED,
  SELECTED,
  PRICED,
  VISIBLE_MINE,
  VISIBLE_PRIZE,
  REVEALED_MINE,
  REVEALED_PRIZE,
  REVEAL_MINE,
  REVEAL_PRIZE,
}

export class Tile extends Phaser.GameObjects.Sprite {
  private hitArea: Phaser.GameObjects.Zone
  private index = 0
  private isDisabled = false
  private isSelected = false
  private particles: Phaser.GameObjects.Particles.ParticleEmitter
  private price = 0
  private priceText: Phaser.GameObjects.Text
  private priceTextShadow: Phaser.GameObjects.Text
  private timer!: Phaser.Time.TimerEvent

  constructor(scene: Phaser.Scene, x: number, y: number, index: number) {
    super(scene, x, y, "tiles", 0)

    this.index = index

    this.scene.add.existing(this)

    this.hitArea = this.scene.add
      .zone(x, y, 68, 68)
      .on("pointerdown", ({ event }: { event: Event }) => {
        event.preventDefault()

        this.timer?.remove()

        this.emit(SceneEvent.CLICK_TILE, this.index, this.price)
      })

    this.priceTextShadow = this.scene.add
      .text(x + 1, y, "", {
        align: "center",
        fontFamily: "__komtit_11e80f",
        fontSize: 11,
        color: "#000000",
      })
      .setOrigin(0.5)
      .setAlpha(0.5)
      .setDepth(1)

    this.priceText = this.scene.add
      .text(x, y - 2, "", {
        align: "center",
        fontFamily: "__komtit_11e80f",
        fontSize: 11,
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setDepth(2)

    this.particles = this.scene.add
      .particles(x, y - 16, "sparkles", {
        alpha: { start: 1, end: 0.5 },
        emitZone: {
          type: "random",
          source: new Phaser.Geom.Ellipse(0, 0, 48, 24),
          quantity: 1,
        },
        frame: [0, 1, 2, 3],
        frequency: 500 + Math.random() * 500,
        lifespan: 250,
        speed: 0,
      })
      .setActive(false)
      .setVisible(false)

    this.setState(TileState.INIT).setDisabled(true)
  }

  private setTextVisible(value: boolean) {
    this.priceText.setVisible(value)
    this.priceTextShadow.setVisible(value)

    return this
  }

  reset() {
    this.timer?.remove()

    return this.setPrice(0)
      .setSelected(false)
      .setState(TileState.INIT)
      .setDisabled(true)
  }

  setDisabled(value: boolean) {
    if (this.isDisabled !== value) {
      this.isDisabled = value

      if (value) {
        this.hitArea.disableInteractive()

        return this
      }

      this.hitArea.setInteractive({ useHandCursor: true })
    }

    return this
  }

  setState(value: TileState) {
    switch (value) {
      case TileState.INIT:
        this.setFrame(this.isSelected ? 16 : 0).setTextVisible(false)
        this.particles.setActive(false).setVisible(false)
        break

      case TileState.VISIBLE_MINE:
        this.setTextVisible(false)

        if (this.state === TileState.CLICKED) {
          this.play("reveal_mine")
        } else {
          this.setFrame(this.isSelected ? 19 : 15)
        }

        this.particles.setActive(false).setVisible(false)
        break

      case TileState.VISIBLE_PRIZE:
        this.setTextVisible(false)

        if (this.state === TileState.CLICKED) {
          this.play("reveal_prize")
        } else {
          this.setFrame(this.isSelected ? 18 : 7)
        }

        this.particles.setActive(true).setVisible(true)
        break

      case TileState.PRICED:
        this.setFrame(17).setTextVisible(true)
        this.timer = this.scene.time.delayedCall(1000, () => {
          this.setFrame(16).setTextVisible(false)
        })
        this.particles.setActive(false).setVisible(false)
        break

      case TileState.CLICKED:
        this.setFrame(4).setTextVisible(false)
        this.particles.setActive(false).setVisible(false)
        break

      case TileState.SELECTED:
        this.setFrame(16).setTextVisible(false)
        this.particles.setActive(false).setVisible(false)
        break

      case TileState.REVEALED_MINE:
        this.setFrame(this.isSelected ? 19 : 3).setTextVisible(false)
        this.particles.setActive(false).setVisible(false)
        break

      case TileState.REVEALED_PRIZE:
        this.setFrame(this.isSelected ? 18 : 2).setTextVisible(false)
        this.particles.setActive(false).setVisible(false)
        break
    }

    return super.setState(value)
  }

  setPrice(price: number) {
    this.price = price
    this.priceText.setText(`x${price.toFixed(2)}`)
    this.priceTextShadow.setText(`x${price.toFixed(2)}`)

    return this
  }

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected

    return this
  }

  destroy(fromScene?: boolean) {
    this.timer?.destroy()

    super.destroy(fromScene)
  }
}
