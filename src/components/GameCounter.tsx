import { useGameContext } from "@/hooks/useGameContext";

export function GameCounter() {
  const { counter, incrementCounter } = useGameContext();

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={incrementCounter}>Increment</button>
      </div>
    </div>
  );
}
