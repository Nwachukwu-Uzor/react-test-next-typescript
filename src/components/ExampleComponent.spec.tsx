import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { DataGrid } from "@mui/x-data-grid";

import { ExampleComponent } from "./ExampleComponent";

jest.mock("@mui/x-data-grid", () => ({
  ...jest.requireActual("@mui/x-data-grid"),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

const mockedDataGrid = mocked(DataGrid);

describe("Example Component Test", () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it("should call the onMoney prop", async () => {
    const onMoney = jest.fn();
    render(<ExampleComponent onMoney={onMoney} />);
    await user.click(screen.getByRole("button", { name: "clicked-money" }));
    expect(onMoney).toHaveBeenCalledTimes(1);
    expect(onMoney).toHaveBeenCalledWith(33);
  });

  it("should render table when props are passed", () => {
    render(<ExampleComponent onMoney={jest.fn} />);
    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
  });
});
