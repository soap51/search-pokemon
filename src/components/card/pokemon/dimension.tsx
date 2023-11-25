import { Dimension } from "@/entity/pokemon";

export const PokemonDimension = ({
  title,
  dimension,
}: {
  title: string;
  dimension: Dimension;
}) => {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <p>{`${dimension.minimum} - ${dimension.maximum}`}</p>
    </div>
  );
};
