import React from "react";
import type { Route } from "./+types/Character";
import { character } from "../utilities/character.ts";

// export async function loader({params}: Route.LoaderArgs) {
//   let character = await getCharacter(params.charId);
//   return { character };
// }

const Character = ({ characterData }) => {
  return (
    <>
      <div>
        <fieldset id="ability-scores" className="flex flex-col">
          <label htmlFor="strength">strength</label>
          <input type="number" name="strength" id="strength" defaultValue={8} />
          <label htmlFor="dexterity">dexterity</label>
          <input
            type="number"
            name="dexterity"
            id="dexterity"
            defaultValue={8}
          />
          <label htmlFor="constitution">constitution</label>
          <input
            type="number"
            name="constitution"
            id="constitution"
            defaultValue={8}
          />
          <label htmlFor="intelligence">intelligence</label>
          <input
            type="number"
            name="intelligence"
            id="intelligence"
            defaultValue={8}
          />
          <label htmlFor="wisdom">wisdom</label>
          <input type="number" name="wisdom" id="wisdom" defaultValue={8} />
          <label htmlFor="charisma">charisma</label>
          <input type="number" name="charisma" id="charisma" defaultValue={8} />
        </fieldset>
      </div>
    </>
  );
};

export default Character;
