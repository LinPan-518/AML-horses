import { render, screen } from "@testing-library/react";
import Details from "../components/Details";
import { Horse } from "../types/definitions";

describe("Details Component", () => {
  const mockHorse: Horse = {
    id: "1",
    name: "Thunder",
    profile: {
      favouriteFood: "Hay",
      physical: {
        height: 160,
        weight: 400,
      },
    },
  };

  test("renders horse details correctly", () => {
    render(<Details horse={mockHorse} />);
    expect(screen.getByText("Name: Thunder")).toBeInTheDocument();
    expect(screen.getByText("Favourite Food: Hay")).toBeInTheDocument();
    expect(screen.getByText("Height: 160 cm")).toBeInTheDocument();
    expect(screen.getByText("Weight: 400 kg")).toBeInTheDocument();
  });

  test("renders empty values for missing properties", () => {
    const incompleteHorse = {
      id: "2",
      name: "",
      profile: {
        favouriteFood: "",
        physical: {
          height: 0,
          weight: 0,
        },
      },
    };

    render(<Details horse={incompleteHorse} />);
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Favourite Food:" ||
          content.includes("Favourite Food:")
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Height:" || content.includes("Height: cm")
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Weight:" || content.includes("Weight: kg")
        );
      })
    ).toBeInTheDocument();
  });

  test("renders empty strings for undefined properties", () => {
    const undefinedHorse = {
      id: "3",
      name: "Spirit",
    };

    render(<Details horse={undefinedHorse} />);
    expect(screen.getByText("Name: Spirit")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Favourite Food:" ||
          content.includes("Favourite Food:")
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Height:" || content.includes("Height: cm")
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === "Weight:" || content.includes("Weight: kg")
        );
      })
    ).toBeInTheDocument();
  });
});
