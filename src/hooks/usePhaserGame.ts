import { Game } from "phaser";
import { useEffect, useRef } from "react";

export function usePhaserGame(config: Phaser.Types.Core.GameConfig) {
  const ref = useRef<Game | null>(null);

  useEffect(() => {
    if (ref.current === null) {
      ref.current = new Game(config);
    }

    return () => {
      if (ref.current) {
        ref.current.destroy(true);
        ref.current = null;
      }
    };
  }, [config]);

  return ref;
}
