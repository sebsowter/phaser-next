"use client";

import { createContext, createRef, PropsWithChildren, RefObject, useEffect, useRef, useState } from "react";

import { GameScene } from "@/phaser/scenes";
import { useGameSceneReadyEvent } from "@/hooks/useGameSceneReadyEvent";
import { useIncrementCounterEvent } from "@/hooks/useIncrementCounterEvent";

export interface GameContextProps {
  counter: number;
  eventRef: RefObject<HTMLDivElement | null>;
  isDisabled: boolean;
  onIncrementCounter: () => void;
}

export const GameContext = createContext<GameContextProps>({
  counter: 0,
  eventRef: createRef(),
  isDisabled: false,
  onIncrementCounter: () => {},
});

export interface GameProviderProps extends PropsWithChildren {
  eventRef: RefObject<HTMLDivElement | null>;
}

export function GameProvider({ children, eventRef }: GameProviderProps) {
  const [isReady, setReady] = useState(false);
  const [counter, setCounter] = useState(0);

  const gameSceneRef = useRef<GameScene | null>(null);

  function onIncrementCounter() {
    setCounter((value) => value + 1);
  }

  function onGameSceneReady(gameScene: GameScene) {
    gameSceneRef.current = gameScene;

    setReady(true);
  }

  useGameSceneReadyEvent(eventRef, onGameSceneReady);
  useIncrementCounterEvent(eventRef, onIncrementCounter);

  useEffect(() => {
    gameSceneRef?.current?.setCounter(counter);
  }, [counter]);

  return (
    <GameContext value={{ counter, eventRef, isDisabled: !isReady, onIncrementCounter }}>
      <div className="max-w-2xl w-full" ref={eventRef}>
        {children}
      </div>
    </GameContext>
  );
}
