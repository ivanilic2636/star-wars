import Eye from "./Eye";
import Homeworld from "./Homeworld";

export default function Character({ character }) {
  const modalId = `homeworldModal-${character.name.replace(/\s+/g, "-")}`;

  return (
    <>
      <th>{character.name}</th>
      <th>{character.birth_year}</th>
      <th>{character.gender}</th>
      <Homeworld character={character} modalId={modalId}></Homeworld>
      <th>
        <Eye eye_color={character.eye_color} />
      </th>
    </>
  );
}
