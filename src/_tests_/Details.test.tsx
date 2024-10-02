// Details.tsx
import { render, screen } from "@testing-library/react";
import Details from "../components/Details";
import { Horse } from "../types/definitions";

describe("Details Component", () => {
  const mockHorse: Horse = {
    id: "1",
    name: "Shadow",
    profile: {
      favouriteFood: "Carrots",
      physical: {
        height: 150,
        weight: 500,
      },
    },
  };

  test("renders horse details correctly", () => {
    render(<Details horse={mockHorse} />);

    // Check if the details are rendered correctly
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(mockHorse.name)).toBeInTheDocument();
    expect(screen.getByText(/Favourite Food/)).toBeInTheDocument();
    expect(
      screen.getByText(mockHorse?.profile?.favouriteFood || "")
    ).toBeInTheDocument();
    expect(screen.getByText(/Height \(kg\)/)).toBeInTheDocument();
    expect(
      screen.getByText(mockHorse?.profile?.physical?.height || "")
    ).toBeInTheDocument();
    expect(screen.getByText(/Weight \(cm\)/)).toBeInTheDocument();
    expect(
      screen.getByText(mockHorse?.profile?.physical?.weight || "")
    ).toBeInTheDocument();
  });

  test("renders empty values if horse data is not provided", () => {
    render(<Details horse={{name:"Horse"} as Horse} />);
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Horse/)).toBeInTheDocument();
  });
});
