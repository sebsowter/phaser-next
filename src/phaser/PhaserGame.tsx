import { usePhaserGame } from "@/hooks/usePhaserGame";
import { useGameEvents } from "@/hooks/useGameEvents";

import { config } from "./config";

export interface GameRendererProps {
  eventRef: React.RefObject<HTMLDivElement | null>;
}

export default function PhaserGame({ eventRef }: GameRendererProps) {
  const parent = "phaser-container";

  useGameEvents(eventRef);
  usePhaserGame({ ...config, parent });

  return <div id={parent} />;
}
