import { EventBus } from "../EventBus";
import { GameEvent } from "../events";

export class GameScene extends Phaser.Scene {
  private _button!: Phaser.GameObjects.Text;
  private _counter!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  create() {
    this._counter = this.add.text(320, 128, "0");

    this.add.text(320, 64, "Count");
    this._button = this.add.text(320, 192, "Increment");
    this._button.setInteractive();
    this._button.on("pointerdown", () => {
      console.log("down");
      EventBus.emit(GameEvent.INCREMENT_COUNTER, this);
    });

    EventBus.emit(GameEvent.GAME_SCENE_READY, this);
  }

  setCounter(value: number) {
    this._counter.setText(value.toString());
  }
}
