import dynamic from "next/dynamic";
import { RefObject } from "react";

const GamePhaser = dynamic(() => import("@/phaser"), {
  ssr: false,
});

export interface GameCanvasProps {
  eventRef: RefObject<HTMLDivElement | null>;
}

export function GameCanvas({ eventRef }: GameCanvasProps) {
  return <GamePhaser eventRef={eventRef} />;
}
