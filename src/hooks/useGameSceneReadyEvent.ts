import { useEffect } from "react";

import { GameEvent } from "@/phaser/events";
import { GameScene } from "@/phaser/scenes";

export function useGameSceneReadyEvent(eventRef: React.RefObject<HTMLDivElement | null>, onReady: (gameScene: GameScene) => void) {
  useEffect(() => {
    const callback: EventListenerOrEventListenerObject = (event) => {
      const customEvent = event as CustomEvent<GameScene>;

      if (customEvent.detail) {
        onReady(customEvent.detail);
      }
    };

    const element = eventRef.current;
    element?.addEventListener(GameEvent.GAME_SCENE_READY, callback);

    return () => {
      element?.removeEventListener(GameEvent.GAME_SCENE_READY, callback);
    };
  }, [eventRef, onReady]);
}
