import { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"; // Import act from react
import AddHorseForm from "../pages/Edit";
import { BrowserRouter } from "react-router-dom";
import * as apiServices from "../services/apiServices"; // Adjust this import according to your structure

jest.mock("../services/apiServices", () => ({
  addHorse: jest.fn(),
  updateHorseById: jest.fn(),
  getHorseById: jest.fn(),
}));

const MockAddHorseForm = () => (
  <BrowserRouter>
    <AddHorseForm />
  </BrowserRouter>
);

describe("AddHorseForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Add Horse form", () => {
    render(<MockAddHorseForm />);

    expect(screen.getByText("Add a New Horse")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create/i })
    ).toBeInTheDocument();
  });

  test("shows error message when horse name is not provided", async () => {
    render(<MockAddHorseForm />);

    // Click the Add Horse button without filling out the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /create/i }));
    });

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Name field is required.")).toBeInTheDocument();
    });
  });

  test("submits form successfully when valid data is provided", async () => {
    render(<MockAddHorseForm />);

    // Fill in the form fields
    await act(async () => {
      const horseNameInput = screen.getByRole("textbox", {
        name: /horse name/i,
      });

      fireEvent.change(horseNameInput, {
        target: { value: "Thunder" },
      });
      fireEvent.change(screen.getByLabelText("Favourite Food"), {
        target: { value: "Hay" },
      });
      fireEvent.change(screen.getByLabelText("Height (cm)"), {
        target: { value: "160" },
      });
      fireEvent.change(screen.getByLabelText("Weight (kg)"), {
        target: { value: "400" },
      });
    });

    // Mocking the addHorse function to resolve the promise
    (apiServices.addHorse as jest.Mock).mockResolvedValueOnce({});

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /create/i }));
    });
    await waitFor(() => {
      expect(apiServices.addHorse).toHaveBeenCalledWith({
        name: "Thunder",
        profile: {
          favouriteFood: "Hay",
          physical: {
            height: 160,
            weight: 400,
          },
        },
      });
    });
  });
});
