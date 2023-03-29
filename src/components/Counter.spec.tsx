import { screen, render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  const setup = () =>
    render(
      <Counter header="Welcome to the Counter Application" defaultValue={0} />
    );

  it("should render the correct header", () => {
    setup();
    expect(
      screen.getByText(/Welcome to the Counter Application/)
    ).toBeInTheDocument();
  });

  it("show the current count on load", () => {
    setup();
    expect(screen.getByText(/Current Count: 0/)).toBeInTheDocument();
  });

  it("Increment Counter to 2 when increment button is clicked twice", () => {
    setup();
    const incrementButton = screen.getByRole("button", {
      name: "increment-counter",
    });
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Current Count: 2/)).toBeInTheDocument();
  });

  it("Reduce Counter to -2 when increment button is clicked twice", () => {
    setup();

    const decrementButton = screen.getByRole("button", {
      name: "decrease-counter",
    });
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Current Count: -2/)).toBeInTheDocument();
  });
});
