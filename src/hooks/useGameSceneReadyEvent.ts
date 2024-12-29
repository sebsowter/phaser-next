import { useEffect } from "react";

import { GameEvent } from "@/phaser/events";
import { GameScene } from "@/phaser/scenes";

export function useGameSceneReadyEvent(eventRef: React.RefObject<HTMLDivElement | null>, callback: (gameScene: GameScene) => void) {
  useEffect(() => {
    const listener: EventListenerOrEventListenerObject = (event) => {
      const customEvent = event as CustomEvent<GameScene>;

      if (customEvent.detail) {
        callback(customEvent.detail);
      }
    };

    const element = eventRef.current;
    element?.addEventListener(GameEvent.GAME_SCENE_READY, listener);

    return () => {
      element?.removeEventListener(GameEvent.GAME_SCENE_READY, listener);
    };
  }, [callback, eventRef]);
}
