import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  POKEMON_QUERY,
  PokemonQuery,
  PokemonQueryVariables,
} from "../gql/pokemon";
import createApolloClient from "../lib/apollo";
import fetch from "cross-fetch";

async function testGetPokemon(
  client: ReturnType<typeof createApolloClient>,
  pokemonName: string,
  expectedType: string
) {
  // Perform the GraphQL query using the ApolloClient instance
  const { data } = await client.query<PokemonQuery, PokemonQueryVariables>({
    query: POKEMON_QUERY,
    variables: { name: pokemonName },
  });
  // Assert that the received data contains the expected Pokémon name
  expect(data.pokemon.name).toBe(pokemonName);
  expect(data.pokemon.types).toContain(expectedType);
}

describe("Pokemon GraphQL API Tests", () => {
  let client: ApolloClient<NormalizedCacheObject>;
  beforeAll(() => {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_POKEMON_ENDPOINT_GRAPHQL,
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  });

  test("Get Charmander", async () => {
    testGetPokemon(client, "Charmander", "Fire");
  });

  test("Get Bulbasaur", async () => {
    testGetPokemon(client, "Bulbasaur", "Grass");
  });

  test("Get Squirtle", async () => {
    testGetPokemon(client, "Squirtle", "Water");
  });
});
