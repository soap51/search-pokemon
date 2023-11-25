export type Pokemon = {
  id: string;
  number: string;
  name: string;
  image: string;
  types: Array<string>;
  weight: Dimension;
  height: Dimension;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  classification: string;
  resistant: Array<string>;
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  weaknesses: Array<string>;
  evolutions: Array<Pokemon>;
  attacks: {
    fast: Array<Attack>;
    special: Array<Attack>;
  };
};

export type Dimension = {
  minimum: number;
  maximum: number;
};

export type Attack = {
  name: string;
  type: string;
  damage: number;
};
