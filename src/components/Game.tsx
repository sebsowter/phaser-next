"use client";

import { useRef } from "react";

import { GameProvider } from "@/context";

import { GameCanvas } from "./GameCanvas";
import { GameCounter } from "./GameCounter";

export function Game() {
  const eventRef = useRef<HTMLDivElement | null>(null);

  return (
    <GameProvider eventRef={eventRef}>
      <div className="flex flex-col items-center justify-center mx-auto max-w-4xl py-8">
        <GameCounter />
        <GameCanvas eventRef={eventRef} />
      </div>
    </GameProvider>
  );
}
