"use client";

import { PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState } from "react";

import { GameContext } from "@/context";
import { useGameSceneReadyEvent } from "@/hooks/useGameSceneReadyEvent";
import { useIncrementCounterEvent } from "@/hooks/useIncrementCounterEvent";
import { GameScene } from "@/phaser/scenes";

export interface GameProviderProps extends PropsWithChildren {
  eventRef: RefObject<HTMLDivElement | null>;
}

export function GameProvider({ children, eventRef }: GameProviderProps) {
  const [isSceneReady, setSceneReady] = useState(false);
  const [counter, setCounter] = useState(0);

  const gameSceneRef = useRef<GameScene | null>(null);

  function incrementCounter() {
    setCounter((value) => value + 1);
  }

  const onGameSceneReady = useCallback((gameScene: GameScene) => {
    gameSceneRef.current = gameScene;

    setSceneReady(true);
  }, []);

  useGameSceneReadyEvent(eventRef, onGameSceneReady);
  useIncrementCounterEvent(eventRef, incrementCounter);

  useEffect(() => {
    gameSceneRef?.current?.setCounter(counter);
  }, [counter]);

  return (
    <GameContext value={{ counter, eventRef, isDisabled: !isSceneReady, incrementCounter }}>
      <div ref={eventRef}>{children}</div>
    </GameContext>
  );
}
