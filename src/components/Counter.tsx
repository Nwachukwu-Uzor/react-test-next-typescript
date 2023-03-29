import React, { ChangeEvent, FC, useEffect, useState } from "react";
// import styles from "@/styles/Counter.module.css";

interface Props {
  header: string;
  defaultValue: number;
}

export const Counter: FC<Props> = ({ header, defaultValue }) => {
  const [count, setCount] = useState(defaultValue);
  const [incrementorValue, setIncrementorValue] = useState(1);
  const [bigEnoughCount, setBigEnoughCount] = useState(defaultValue >= 15);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (count >= 15) {
      timerId = setTimeout(() => {
        setBigEnoughCount(true);
      }, 300);
    }

    return function cleanup() {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [count]);

  const handleIncrementorValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value.replace(/\D/, "")) ?? 0;
    setIncrementorValue(value);
  };

  const handleIncrementorInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/\D/, "")) ?? 0;
    if (value > 0) {
      setIncrementorValue(value);
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
            aria-label="incrementor-value"
            value={incrementorValue}
            onChange={handleIncrementorValueChange}
            onBlur={handleIncrementorInputBlur}
          />
        </div>
        {bigEnoughCount ? null : (
          <h1 arial-label="display-text-for-counter-less-than-15">
            I am too small
          </h1>
        )}
      </div>
    </section>
  );
};
