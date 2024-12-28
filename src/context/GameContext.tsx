import { createContext, createRef, RefObject } from "react";

export interface GameContextProps {
  counter: number;
  eventRef: RefObject<HTMLDivElement | null>;
  incrementCounter: () => void;
  isDisabled: boolean;
}

export const GameContext = createContext<GameContextProps>({
  counter: 0,
  eventRef: createRef(),
  incrementCounter: () => {},
  isDisabled: false,
});
