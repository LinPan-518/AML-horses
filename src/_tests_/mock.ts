import { Horse } from "../types/definitions";

export const mockHorses: Horse[] = [
  {
    id: "1",
    name: "Thunder",
    profile: {
      favouriteFood: "chips",
      physical: {
        height: 100,
        weight: 400,
      },
    },
  },

  {
    id: "2",
    name: "Lightning",
    profile: {
      favouriteFood: "chips",
      physical: {
        height: 100,
        weight: 200,
      },
    },
  },

  {
    id: "3",
    name: "Storm",
    profile: {
      favouriteFood: "chips",
      physical: {
        weight: 200,
      },
    },
  },
];
