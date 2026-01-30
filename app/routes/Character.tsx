import React from "react";
import type { Route } from "./+types/Character";

export async function loader({params}: Route.LoaderArgs) {
  let character = await getCharacter(params.charId);
  return { character };
}

const Character = () => {
  return <div>Character</div>;
};

export default Character;
