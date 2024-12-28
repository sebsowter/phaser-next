import { RefObject } from "react";

import { useGame } from "@/hooks/useGame";
import { usePhaserGame } from "@/hooks/usePhaserGame";

import { config } from "./config";

export interface GameRendererProps {
  eventRef: RefObject<HTMLDivElement | null>;
}

export default function PhaserGame({ eventRef }: GameRendererProps) {
  const parent = "phaser-container";

  useGame(eventRef);
  usePhaserGame({ ...config, parent });

  return <div id={parent} />;
}
