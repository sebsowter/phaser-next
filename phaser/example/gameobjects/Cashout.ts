export class Cashout extends Phaser.GameObjects.Container {
  private image: Phaser.GameObjects.Image
  private multiplierText: Phaser.GameObjects.Text
  private valueText: Phaser.GameObjects.Text
  private nuggetParticles: Phaser.GameObjects.Particles.ParticleEmitter
  private sparkleParticles: Phaser.GameObjects.Particles.ParticleEmitter
  private initialY = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.scene.add.existing(this)

    this.initialY = y

    this.image = this.scene.add.image(0, 0, "cashout")

    this.valueText = this.scene.add
      .text(0, 46, "", {
        fontFamily: "__komtit_11e80f",
        fontSize: 20,
      })
      .setOrigin(0.5)

    this.multiplierText = this.scene.add
      .text(0, 78, "", {
        fontFamily: "__komtit_11e80f",
        fontSize: 14,
      })
      .setOrigin(0.5)

    this.sparkleParticles = this.scene.add.particles(0, -68, "sparkles", {
      alpha: { start: 1, end: 0.5 },
      emitZone: {
        type: "random",
        source: new Phaser.Geom.Ellipse(0, 0, 68, 40),
        quantity: 1,
      },
      frame: [0, 1, 2, 3],
      frequency: 100,
      lifespan: 250,
      speed: 0,
    })

    this.nuggetParticles = this.scene.add.particles(0, -88, "nugget", {
      emitZone: {
        type: "random",
        source: new Phaser.Geom.Ellipse(0, 0, 64, 64),
        quantity: 1,
      },
      gravityY: 300,
      lifespan: 5000,
      speed: 200,
    })

    this.add(this.image)
      .add(this.valueText)
      .add(this.multiplierText)
      .add(this.sparkleParticles)
      .add(this.nuggetParticles)
      .setOpen(false)
  }

  setOpen(value: boolean) {
    if (value) {
      this.setY(this.initialY + 16).setAlpha(0.5)
      this.scene.tweens.add({
        targets: this,
        props: { alpha: 1, y: this.initialY },
        duration: 150,
        ease: Phaser.Math.Easing.Back.Out,
      })
      this.nuggetParticles.explode(20)
    } else {
      this.setY(this.initialY)
    }

    return this.setActive(value).setVisible(value)
  }

  setMultiplier(value: number) {
    this.multiplierText.setText(`x${value.toFixed(2)}`)

    return this
  }

  setValue(value: number) {
    this.valueText.setText(`$${value.toFixed(2)}`)

    return this
  }
}
