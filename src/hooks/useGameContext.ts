import { useContext } from "react";

import { GameContext } from "@/context/GameContext";

export function useGameContext() {
  return useContext(GameContext);
}
