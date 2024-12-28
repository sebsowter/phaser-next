"use client";

import { PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState } from "react";

import { GameContext } from "@/context";
import { GameScene } from "@/phaser/scenes";
import { useGameSceneReadyEvent } from "@/hooks/useGameSceneReadyEvent";
import { useIncrementCounterEvent } from "@/hooks/useIncrementCounterEvent";

export interface GameProviderProps extends PropsWithChildren {
  eventRef: RefObject<HTMLDivElement | null>;
}

export function GameProvider({ children, eventRef }: GameProviderProps) {
  const [isSceneReady, setSceneReady] = useState(false);
  const [counter, setCounter] = useState(0);

  const gameSceneRef = useRef<GameScene | null>(null);

  const onIncrementCounter = useCallback(() => setCounter((value) => value + 1), []);

  const onGameSceneReady = useCallback((gameScene: GameScene) => {
    gameSceneRef.current = gameScene;

    setSceneReady(true);
  }, []);

  useGameSceneReadyEvent(eventRef, onGameSceneReady);
  useIncrementCounterEvent(eventRef, onIncrementCounter);

  useEffect(() => {
    gameSceneRef?.current?.setCounter(counter);
  }, [counter]);

  return (
    <GameContext value={{ counter, eventRef, isDisabled: !isSceneReady, onIncrementCounter }}>
      <div className="max-w-2xl w-full" ref={eventRef}>
        {children}
      </div>
    </GameContext>
  );
}
