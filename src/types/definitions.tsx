interface Physical {
  height?: number;
  weight?: number;
}

interface Profile {
  favouriteFood?: string;
  physical?: Physical;
}

export interface EditHorse {
  name: string;
  favouriteFood: string;
  weight: number | string;
  height: number | string;
};

export interface Horse {
  id: string;
  name: string;
  profile?: Profile;
}