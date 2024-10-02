import { render, screen, fireEvent } from "@testing-library/react";
import Item from "../components/ListItem";
import { mockHorses } from "./mock";
import { Horse } from "../types/definitions";

describe("Item Component", () => {
  const mockHorse: Horse = mockHorses[0];
  const mockView = jest.fn();
  const mockEdit = jest.fn();
  const mockCompare = jest.fn();
  const mockIds = ["2"];

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  test("renders horse name and buttons", () => {
    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={mockIds}
      />
    );

    // Check if the horse's name is displayed
    expect(screen.getByText("Thunder")).toBeInTheDocument();

    // Check if the buttons are rendered
    expect(screen.getByText("Compare")).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("calls compare function with correct id when compare button is clicked", () => {
    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={mockIds}
      />
    );

    const compareButton = screen.getByText("Compare");
    fireEvent.click(compareButton);

    // Ensure the compare function is called with the correct id
    expect(mockCompare).toHaveBeenCalledWith("1");
  });

  test("calls view function with correct id when view button is clicked", () => {
    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={mockIds}
      />
    );

    const viewButton = screen.getByText("View Details");
    fireEvent.click(viewButton);

    // Ensure the view function is called with the correct id
    expect(mockView).toHaveBeenCalledWith("1");
  });

  test("calls edit function with correct id when edit button is clicked", () => {
    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={mockIds}
      />
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    expect(mockEdit).toHaveBeenCalledWith("1");
  });

  test("disables compare button when horse id is in ids array", () => {
    const idsWithHorse = ["1"];

    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={idsWithHorse}
      />
    );

    const compareButton = screen.getByText("Compare");
    expect(compareButton).toBeDisabled();
  });

  test("enables compare button when horse id is not in ids array", () => {
    render(
      <Item
        horse={mockHorse}
        view={mockView}
        edit={mockEdit}
        compare={mockCompare}
        ids={mockIds}
      />
    );

    const compareButton = screen.getByText("Compare");
    expect(compareButton).not.toBeDisabled();
  });
});
