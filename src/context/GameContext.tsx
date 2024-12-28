"use client";

import { createContext, createRef, PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState } from "react";

import { GameScene } from "@/phaser/scenes";
import { useGameSceneReadyEvent } from "@/hooks/useGameSceneReadyEvent";
import { useIncrementCounterEvent } from "@/hooks/useIncrementCounterEvent";

export interface GameContextProps {
  counter: number;
  eventRef: RefObject<HTMLDivElement | null>;
  incrementCounter: () => void;
}

export const GameContext = createContext<GameContextProps>({
  counter: 0,
  eventRef: createRef(),
  incrementCounter: () => {},
});

export interface GameProviderProps extends PropsWithChildren {
  eventRef: RefObject<HTMLDivElement | null>;
}

export function GameProvider({ children, eventRef }: GameProviderProps) {
  const [counter, setCounter] = useState(0);

  const gameSceneRef = useRef<GameScene | null>(null);

  const incrementCounter = useCallback(() => setCounter((value) => value + 1), []);

  const onGameSceneReady = useCallback((gameScene: GameScene) => {
    gameSceneRef.current = gameScene;
  }, []);

  const onIncrementCounter = useCallback(() => {
    setCounter((value) => value + 1);
  }, []);

  useGameSceneReadyEvent(eventRef, onGameSceneReady);
  useIncrementCounterEvent(eventRef, onIncrementCounter);

  useEffect(() => {
    gameSceneRef?.current?.setCounter(counter);
  }, [counter]);

  return (
    <GameContext value={{ counter, eventRef, incrementCounter }}>
      <div ref={eventRef}>{children}</div>
    </GameContext>
  );
}
