import { EventBus } from "../EventBus";
import { GameEvent } from "../events";

export class GameScene extends Phaser.Scene {
  private _counter!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  create() {
    this._counter = this.add.text(320, 160, "0").setOrigin(0.5);

    this.add.text(320, 128, "Count").setOrigin(0.5);
    this.add
      .text(320, 192, "INCREMENT")
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", function () {
        EventBus.emit(GameEvent.INCREMENT_COUNTER);
      });

    EventBus.emit(GameEvent.GAME_SCENE_READY, this);
  }

  setCounter(value: number) {
    this._counter.setText(value.toString());
  }
}
