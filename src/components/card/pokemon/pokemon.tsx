import { Pokemon } from "@/entity/pokemon";
import Image from "next/image";
import Link from "next/link";
import { PokemonAttributeSection } from "./attribute-section";
import { PokemonAttribute } from "./attribute";
import { PokemonDimension } from "./dimension";
import { PokemonAttack } from "./attack";
import { useRouter } from "next/router";

type PokemonCardProps = Exclude<Pokemon, "evolutions">;

const PokemonCard = ({
  name,
  image,
  types,
  attacks,
  weight,
  height,
  classification,
  fleeRate,
  maxCP,
  maxHP,
  resistant,
  weaknesses,
  evolutionRequirements,
  number,
}: PokemonCardProps) => {
  const router = useRouter();
  const { search } = router.query;
  return (
    <div>
      <div className="flex flex-col mx-12 xl:mx-0 xl:flex-row lg:gap-x-8 ">
        <Image
          className="lg:self-center xl:self-start	w-auto	h-auto"
          alt={name}
          src={image}
          width={350}
          height={350}
        />
        <div className="my-4 flex flex-row gap-x-12 ">
          <div className="flex flex-col w-full gap-y-4">
            <div className="flex lg:flex-row flex-col lg:items-center gap-x-6 mb-4 lg:mb-0">
              <Link
                className={`text-3xl font-bold  ${
                  search &&
                  (search as string).toLowerCase() === name.toLowerCase()
                    ? "pointer-events-none"
                    : "pointer-events-auto text-blue-500"
                }`}
                href={{
                  pathname: "/",
                  query: {
                    search: name,
                  },
                }}
              >
                {`#${number} ${name}`}
              </Link>
              <div className="flex gap-x-4 mt-4 lg:mt-0">
                {types.map((type) => {
                  return (
                    <p
                      key={type}
                      className="bg-gray-400 p-2 rounded text-white"
                    >
                      {type}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-x-4 ">
              <PokemonAttack title="Fast Attacks" attacks={attacks.fast} />
              <PokemonAttack
                title="Special Attacks"
                attacks={attacks.special}
              />
            </div>
            <PokemonAttributeSection>
              <PokemonDimension title="Height" dimension={height} />
              <PokemonDimension title="Weight" dimension={weight} />
            </PokemonAttributeSection>
            <PokemonAttributeSection>
              <PokemonAttribute title="Max CP" attribute={maxCP} />
              <PokemonAttribute title="Max HP" attribute={maxHP} />
            </PokemonAttributeSection>
            <PokemonAttributeSection>
              <PokemonAttribute
                title="Resistant"
                attribute={resistant.join(", ")}
              />
              <PokemonAttribute
                title="Weaknesses"
                attribute={weaknesses.join(", ")}
              />
            </PokemonAttributeSection>
            <PokemonAttributeSection>
              <PokemonAttribute
                title="Classification"
                attribute={classification}
              />
              <PokemonAttribute title="Flee Rate" attribute={fleeRate} />
            </PokemonAttributeSection>
            {evolutionRequirements ? (
              <PokemonAttributeSection>
                <PokemonAttribute
                  title="Evolution Requirements"
                  attribute={evolutionRequirements?.amount}
                />
              </PokemonAttributeSection>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
