import { useContext } from "react";

import { GameContext } from "@/context";

export function useGameContext() {
  return useContext(GameContext);
}
