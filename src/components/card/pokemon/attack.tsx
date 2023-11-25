import { Attack } from "@/entity/pokemon";

export const PokemonAttack = ({
  title,
  attacks,
}: {
  title: string;
  attacks: Array<Attack>;
}) => {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
      <ul>
        {attacks.map((attack) => {
          return (
            <li key={attack.name}>
              {attack.name} - {attack.type} - {attack.damage}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
