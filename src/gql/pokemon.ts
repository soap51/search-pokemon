import { Pokemon } from "@/entity/pokemon";
import { gql } from "@apollo/client";

export type PokemonQuery = {
  pokemon: Pokemon;
};

export type PokemonQueryVariables = {
  id?: string;
  name?: string;
};

const POKEMON_FRAGMENT = gql`
  fragment PokemonFragment on Pokemon {
    id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    evolutionRequirements {
      amount
    }
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
  }
`;

export const POKEMON_QUERY = gql`
  ${POKEMON_FRAGMENT}
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      ...PokemonFragment
      evolutions {
        ...PokemonFragment
      }
    }
  }
`;
