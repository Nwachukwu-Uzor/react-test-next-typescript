import React from "react";
import { render, screen } from "@testing-library/react";

import { Hello } from "./Hello";

it('Should render "Hello World"', () => {
  render(<Hello />);
  const component = screen.getByText(/Hello World/);
  expect(component).toBeInTheDocument();
});
