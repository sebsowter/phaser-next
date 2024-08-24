import { MinesSquare, MinesSquareState } from "@/lib/mines/types"

import { EventBus } from "../../EventBus"
import { GameEvent, SceneEvent, TILE_TOTAL } from "../constants"
import { Cashout, Pick, Tile, TileState } from "../gameobjects"
import { calculateMultipliers, randomTileIndex, tilePosition } from "../utils"

export class GameScene extends Phaser.Scene {
  private cashout!: Cashout
  private isAuto = false
  private multipliers: number[] = []
  private numberOfMines = 2
  private pick!: Pick
  private selectedTiles: number[] = []
  private squares: MinesSquare[] = []
  private tiles: Tile[] = []

  constructor() {
    super("Game")
  }

  protected create() {
    this.game.input.touch.capture = false

    this.multipliers = calculateMultipliers(2)

    this.createBoard().createTiles().createPick().createCashout()

    EventBus.emit(GameEvent.GAME_SCENE_READY, this)
  }

  private createBoard() {
    this.add.image(0, 0, "board").setOrigin(0)

    return this
  }

  private createCashout() {
    this.cashout = new Cashout(this, 192, 192)

    return this
  }

  private createPick() {
    this.pick = new Pick(this, 192, 192).on(SceneEvent.CLICK_PICK, () => {
      this.activateTiles()
    })

    return this
  }

  private createTiles() {
    this.tiles = Array.from(Array(TILE_TOTAL)).map((_, index) => {
      const position = tilePosition(index)

      return new Tile(this, position.x, position.y, index).on(
        SceneEvent.CLICK_TILE,
        this.handleTileClick,
        this,
      )
    })

    return this
  }

  private handleTileClick(index: number) {
    const tile = this.tiles[index]

    if (this.isAuto) {
      if (this.selectedTiles.includes(index)) {
        this.selectedTiles = this.selectedTiles.filter(
          (visibleTile) => visibleTile !== index,
        )

        tile.setPrice(0).setSelected(false).setState(TileState.INIT)

        EventBus.emit(GameEvent.SELECT_TILE, index, false)
      } else if (this.selectedTiles.length < TILE_TOTAL - this.numberOfMines) {
        this.selectedTiles = [...this.selectedTiles, index]

        const price = this.multipliers[this.selectedTiles.length] ?? 1

        tile.setPrice(price).setSelected(true).setState(TileState.PRICED)

        EventBus.emit(GameEvent.SELECT_TILE, index, true)
      }
    } else {
      tile.setState(TileState.CLICKED).setDisabled(true)

      EventBus.emit(GameEvent.SELECT_TILE, index)
    }
  }

  activateTiles() {
    this.tiles.forEach((tile) => {
      tile.setDisabled(false)
    })
  }

  disableTiles() {
    this.tiles.forEach((tile) => {
      tile.setDisabled(true)
    })
  }

  pickRandomTile() {
    this.handleTileClick(randomTileIndex(this.squares))
  }

  reset(clearSelected = true) {
    this.cashout.setOpen(false)
    this.pick.setOpen(false)

    this.squares = []

    if (clearSelected) {
      this.selectedTiles = []
    }

    this.tiles.forEach((tile, index) => {
      tile
        .setState(
          this.selectedTiles.includes(index) && !clearSelected
            ? TileState.SELECTED
            : TileState.INIT,
        )
        .setDisabled(clearSelected)
    })
  }

  setAuto(isAuto: boolean) {
    this.isAuto = isAuto
    this.selectedTiles = []

    this.pick.setOpen(isAuto)

    this.tiles.forEach((tile) => {
      tile.reset()
    })
  }

  setCashout(amount: number, multiplier: number) {
    this.disableTiles()
    this.cashout.setValue(amount).setMultiplier(multiplier).setOpen(true)
  }

  setNumberOfMines(numberOfMines: number) {
    this.numberOfMines = numberOfMines
    this.multipliers = calculateMultipliers(numberOfMines)
    this.pick.setNumberOfMines(numberOfMines)

    const max = TILE_TOTAL - numberOfMines

    if (this.selectedTiles.length > max) {
      this.selectedTiles.splice(max).forEach((index) => {
        const tile = this.tiles[index]

        tile.setSelected(false).setState(TileState.INIT)
      })
    }
  }

  setTiles(squares: MinesSquare[]) {
    let hasMine = false

    this.squares = squares
    this.squares.forEach((square, index) => {
      const tile = this.tiles[index]

      tile.setSelected(this.selectedTiles.includes(index))

      switch (square.state) {
        case MinesSquareState.Unknown:
          tile.setState(TileState.INIT)
          break

        case MinesSquareState.DiscoveredMine:
          tile.setState(TileState.VISIBLE_MINE)
          hasMine = true
          break

        case MinesSquareState.DiscoveredPrize:
          tile.setState(TileState.VISIBLE_PRIZE)
          break

        case MinesSquareState.UndiscoveredMine:
          tile.setState(TileState.REVEALED_MINE)
          break

        case MinesSquareState.UndiscoveredPrize:
          tile.setState(TileState.REVEALED_PRIZE)
          break
      }
    })

    if (hasMine) {
      this.disableTiles()
      this.cameras.main.shake(150, 0.01)
    }
  }
}
