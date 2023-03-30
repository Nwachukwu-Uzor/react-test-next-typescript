import { render, screen } from "@testing-library/react";
import UsingComplex from "./UsingComplex";

jest.mock("./Complex/Complex");

describe("Tests UsingComplex", () => {
  it("Ensure the very complex component", () => {
    render(<UsingComplex />);
    expect(screen.getByText(/Abracadabra/)).toBeInTheDocument();
  });
});
