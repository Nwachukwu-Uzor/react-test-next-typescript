import React, { FC, useState } from "react";

interface Props {
  header: string;
  defaultValue: number;
}

const Counter: FC<Props> = ({ header, defaultValue }) => {
  const [count, setCount] = useState(defaultValue);
  return (
    <div>
      <h1>{header}</h1>
      <h4>Current Count: {count}</h4>
      <button
        aria-label="decrease-counter"
        onClick={() => setCount((current) => current - 1)}
      >
        Decrease
      </button>
      <button
        aria-label="increment-counter"
        onClick={() => setCount((current) => current + 1)}
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
