import { MutableRefObject } from "react"

import { useMinesGame, usePhaserGame } from "@/app/hooks"

import { config } from "./config"

export interface MinesGameProps {
  eventRef: MutableRefObject<HTMLDivElement | null>
}

export default function MinesGame({ eventRef }: MinesGameProps) {
  const parent = "phaser-container"

  useMinesGame(eventRef)
  usePhaserGame({ ...config, parent })

  return <div id={parent} />
}
