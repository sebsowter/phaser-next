import { BootScene, GameScene, LoaderScene } from "./scenes";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 320,
  parent: "phaser-container",
  scene: [BootScene, LoaderScene, GameScene],
};
