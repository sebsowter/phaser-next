import dynamic from "next/dynamic";

const GamePhaser = dynamic(() => import("@/phaser"), {
  ssr: false,
});

export interface GameCanvasProps {
  eventRef: React.RefObject<HTMLDivElement | null>;
}

export function GameCanvas({ eventRef }: GameCanvasProps) {
  return <GamePhaser eventRef={eventRef} />;
}
