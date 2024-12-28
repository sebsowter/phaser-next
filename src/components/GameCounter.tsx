import { useGameContext } from "@/hooks";

export function GameCounter() {
  const { counter, onIncrementCounter } = useGameContext();

  return (
    <div className="text-center w-full">
      <div className="">
        <button className="bg-gray-800 px-4 py-2" onClick={onIncrementCounter}>
          Increment counter
        </button>
      </div>
      <div className="p-2">
        <p>{counter}</p>
      </div>
    </div>
  );
}
