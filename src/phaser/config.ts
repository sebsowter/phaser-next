import { BootScene, GameScene, LoaderScene } from "./scenes";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: "phaser-container",
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [BootScene, LoaderScene, GameScene],
};
