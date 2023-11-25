export const PokemonAttribute = ({
  title,
  attribute,
}: {
  title: string;
  attribute: string | number;
}) => {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <p>{attribute}</p>
    </div>
  );
};
