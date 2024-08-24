import { MinesSquare, MinesSquareState } from "@/lib/mines/types"
import { TILE_COLS, TILE_GAP, TILE_HEIGHT, TILE_WIDTH } from "../constants"

export function tilePosition(index: number) {
  return new Phaser.Geom.Point(
    14 + TILE_WIDTH / 2 + (index % TILE_COLS) * (TILE_WIDTH + TILE_GAP),
    14 +
      TILE_HEIGHT / 2 +
      Math.floor(index / TILE_COLS) * (TILE_HEIGHT + TILE_GAP),
  )
}

export function randomTileIndex(squares: MinesSquare[] = []) {
  const available = squares.reduce<number[]>(
    (current, square, index) =>
      square.state === MinesSquareState.Unknown ? [...current, index] : current,
    [],
  )

  return available[Math.floor(Math.random() * available.length)]
}

export const COEFFICIENT = 0.99

export function calculateMultipliers(numOfMines: number) {
  const multipliers = []

  const totalSquares = 25
  const availableMoves = totalSquares - numOfMines

  let cumulativeChanceOfSuccess = 1.0

  multipliers.push(cumulativeChanceOfSuccess)

  for (let i = 0; i < availableMoves; i++) {
    let chanceOfSuccessForIthPick = 1 - numOfMines / (totalSquares - i)
    cumulativeChanceOfSuccess =
      cumulativeChanceOfSuccess * chanceOfSuccessForIthPick

    multipliers.push(COEFFICIENT / cumulativeChanceOfSuccess)
  }

  return multipliers
}
