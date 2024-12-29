import { useEffect } from "react";

import { GameEvent } from "@/phaser/events";

export function useIncrementCounterEvent(eventRef: React.RefObject<HTMLDivElement | null>, callback: () => void) {
  useEffect(() => {
    const element = eventRef.current;
    element?.addEventListener(GameEvent.INCREMENT_COUNTER, callback);

    return () => {
      element?.removeEventListener(GameEvent.INCREMENT_COUNTER, callback);
    };
  }, [callback, eventRef]);
}
