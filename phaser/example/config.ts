import { BootScene, GameScene, PreloaderScene } from "./scenes"

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 384,
  height: 384,
  input: {
    touch: {
      capture: true,
    },
  },
  render: {
    antialias: true,
  },
  scene: [BootScene, PreloaderScene, GameScene],
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
  },
  transparent: true,
}
