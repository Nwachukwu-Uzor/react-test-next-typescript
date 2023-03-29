import React, { ChangeEvent, FC, useState } from "react";
// import styles from "@/styles/Counter.module.css";

interface Props {
  header: string;
  defaultValue: number;
}

export const Counter: FC<Props> = ({ header, defaultValue }) => {
  const [count, setCount] = useState(defaultValue);
  const [incrementorValue, setIncrementorValue] = useState(1);

  const handleIncrementorValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/, "");
    if (Number(value) > 0) {
      setIncrementorValue(Number(value));
      return;
    }
    setIncrementorValue(1);
  };

  return (
    <section /**className={styles["container"]} */>
      <div /** className={styles["counter-container"]} */>
        <h1>{header}</h1>
        <h4>Current Count: {count}</h4>
        <button
          aria-label="decrease-counter"
          onClick={() => setCount((current) => current - incrementorValue)}
        >
          Decrease
        </button>
        <button
          aria-label="increment-counter"
          onClick={() => setCount((current) => current + incrementorValue)}
        >
          Increment
        </button>
        <div>
          <label>Incrementor Value</label>
          <input
            type="text"
            aria-label="increment-counter"
            value={incrementorValue}
            onChange={handleIncrementorValueChange}
          />
        </div>
      </div>
    </section>
  );
};
