import PokemonCard from "@/components/card/pokemon/pokemon";
import { SearchInput } from "@/components/input/search";
import { Pokemon } from "@/entity/pokemon";
import {
  POKEMON_QUERY,
  PokemonQuery,
  PokemonQueryVariables,
} from "@/gql/pokemon";
import createApolloClient from "@/lib/apollo";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function Home({ data }: { data?: Pokemon }) {
  const router = useRouter();
  const { search } = router.query;
  return (
    <main className="flex flex-col justify-center xl:py-12 xl:mx-48 py-4 mx-4 gap-y-8 ">
      <SearchInput />

      {search && search !== "" ? (
        <>
          {data ? (
            <PokemonCard {...data} />
          ) : (
            <h1 className="text-3xl font-bold text-center mt-12">
              Pokemon Not Found
            </h1>
          )}
          {data?.evolutions && data?.evolutions.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold">Evolutions</h1>
              <div className="flex flex-col gap-y-12">
                {data?.evolutions &&
                  data.evolutions.map((evolution) => {
                    return <PokemonCard key={evolution.id} {...evolution} />;
                  })}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <h1 className="text-3xl font-bold text-center mt-12">
          Search for a Pokemon
        </h1>
      )}
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchText = context.query.search;
  if (!searchText || searchText === "") {
    return {
      props: {},
    };
  }

  const client = createApolloClient();
  const { data } = await client.query<PokemonQuery, PokemonQueryVariables>({
    query: POKEMON_QUERY,
    variables: { name: searchText as string },
  });
  return {
    props: {
      data: data.pokemon,
    },
  };
}
