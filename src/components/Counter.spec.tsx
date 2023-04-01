import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Counter } from "./Counter";
import user from "@testing-library/user-event";

describe("Counter", () => {
  const setup = (value = 0) =>
    render(
      <Counter
        header="Welcome to the Counter Application"
        defaultValue={value}
      />
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

  it("Increment Counter to 2 when increment button is clicked twice", async () => {
    setup();
    const incrementButton = screen.getByRole("button", {
      name: "increment-counter",
    });
    await user.click(incrementButton);
    await user.click(incrementButton);
    await screen.findByText(/Current Count: 2/);
    expect(screen.getByText(/Current Count: 2/)).toBeInTheDocument();
  });

  it("Reduce Counter to -2 when decrement button is clicked twice", async () => {
    setup();

    const decrementButton = screen.getByRole("button", {
      name: "decrease-counter",
    });
    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(screen.getByText(/Current Count: -2/)).toBeInTheDocument();
  });

  it("increment value input should revert to 1 when blurred if the value entered is less than 1", async () => {
    setup();

    const incrementBox = screen.getByLabelText("incrementor-value");
    await user.type(incrementBox, "{backspace}0");

    fireEvent.blur(incrementBox);
    expect(screen.getByLabelText("incrementor-value")).toHaveValue("1");
  });

  it("incrementor value should be 12 when a user types '1a2'", async () => {
    setup();
    const incrementBox = screen.getByLabelText("incrementor-value");
    await user.type(incrementBox, "{backspace}1a2");
    expect(screen.getByLabelText("incrementor-value")).toHaveValue("12");
  });

  it("the count should increase by the incrementor value, count should be 5 when the incrementor value is 5 and the increment button is clicked", async () => {
    setup();
    const incrementBox = screen.getByLabelText("incrementor-value");
    const incrementButton = screen.getByRole("button", {
      name: "increment-counter",
    });
    await user.type(incrementBox, "{backspace}5");

    await user.click(incrementButton);
    expect(screen.getByText(/Current Count: 5/)).toBeInTheDocument();
  });

  it("the count should increase by the incrementor value, count should be -5 when the incrementor value is 5 and the decrement button is clicked", async () => {
    setup();
    const incrementBox = screen.getByLabelText("incrementor-value");
    const decrementButton = screen.getByRole("button", {
      name: "decrease-counter",
    });
    await user.type(incrementBox, "{backspace}5");
    await user.click(decrementButton);
    expect(screen.getByText(/Current Count: -5/)).toBeInTheDocument();
  });

  it("big enough text shoul disappear in 300ms after the value of the count becomes 0", async () => {
    setup(14);
    const incrementButton = screen.getByRole("button", {
      name: "increment-counter",
    });
    await user.click(incrementButton);
    await waitForElementToBeRemoved(() => screen.queryByText(/I am too small/));
    expect(screen.queryByText(/I am too small/)).not.toBeInTheDocument();
  });
});
