"use client";

import { useEffect, useRef, useState } from "react";

import { GameContext } from "@/context/GameContext";
import { useGameSceneReadyEvent } from "@/hooks/useGameSceneReadyEvent";
import { useIncrementCounterEvent } from "@/hooks/useIncrementCounterEvent";
import { GameScene } from "@/phaser/scenes";

export interface GameProviderProps extends React.PropsWithChildren {
  eventRef: React.RefObject<HTMLDivElement | null>;
}

export function GameProvider({ children, eventRef }: GameProviderProps) {
  const [isGameSceneReady, setGameSceneReady] = useState(false);
  const [counter, setCounter] = useState(0);
  const gameSceneRef = useRef<GameScene | null>(null);

  function incrementCounter() {
    setCounter((value) => value + 1);
  }

  function onGameSceneReady(gameScene: GameScene) {
    gameSceneRef.current = gameScene;

    setGameSceneReady(true);
  }

  useGameSceneReadyEvent(eventRef, onGameSceneReady);
  useIncrementCounterEvent(eventRef, incrementCounter);

  useEffect(() => {
    gameSceneRef.current?.setCounter(counter);
  }, [counter]);

  return (
    <GameContext value={{ counter, eventRef, isDisabled: !isGameSceneReady, incrementCounter }}>
      <div ref={eventRef}>{children}</div>
    </GameContext>
  );
}
