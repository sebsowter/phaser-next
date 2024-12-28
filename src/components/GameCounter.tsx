import { useGameContext } from "@/hooks/useGameContext";

export function GameCounter() {
  const { counter, incrementCounter, isDisabled } = useGameContext();

  return (
    <div className="text-center w-full">
      <button disabled={isDisabled} className="bg-gray-800 px-4 py-2 disabled:text-gray-500" onClick={incrementCounter}>
        INCREMENT
      </button>
      <div className="p-2">
        <p className="font-bold text-4xl">{counter}</p>
      </div>
    </div>
  );
}
