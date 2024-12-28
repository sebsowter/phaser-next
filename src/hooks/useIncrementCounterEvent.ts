import { RefObject, useEffect } from "react";

import { GameEvent } from "@/phaser/events";

export function useIncrementCounterEvent(eventRef: RefObject<HTMLDivElement | null>, onIncrement: () => void) {
  useEffect(() => {
    const element = eventRef.current;
    element?.addEventListener(GameEvent.INCREMENT_COUNTER, onIncrement);

    return () => {
      element?.removeEventListener(GameEvent.INCREMENT_COUNTER, onIncrement);
    };
  }, [eventRef, onIncrement]);
}
