import { MutableRefObject, useCallback, useEffect } from "react"

import { EventBus } from "@/phaser/EventBus"
import { GameEvent } from "@/phaser/mines/constants"
import { GameScene } from "@/phaser/mines/scenes"

export function useMinesGame(
  eventRef: MutableRefObject<HTMLDivElement | null>,
) {
  const handleGameSceneReady = useCallback(
    (scene: GameScene) => {
      eventRef.current?.dispatchEvent(
        new CustomEvent(GameEvent.GAME_SCENE_READY, { detail: scene }),
      )
    },
    [eventRef],
  )

  const handleSelectTile = useCallback(
    (index: number, isChecked: boolean) => {
      eventRef.current?.dispatchEvent(
        new CustomEvent(GameEvent.SELECT_TILE, {
          detail: { index, isChecked },
        }),
      )
    },
    [eventRef],
  )

  useEffect(() => {
    EventBus.on(GameEvent.GAME_SCENE_READY, handleGameSceneReady)

    return () => {
      EventBus.removeListener(GameEvent.GAME_SCENE_READY, handleGameSceneReady)
    }
  }, [handleGameSceneReady])

  useEffect(() => {
    EventBus.on(GameEvent.SELECT_TILE, handleSelectTile)

    return () => {
      EventBus.removeListener(GameEvent.SELECT_TILE, handleSelectTile)
    }
  }, [handleSelectTile])
}
