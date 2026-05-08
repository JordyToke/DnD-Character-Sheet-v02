// DnD character class / description / interface

interface IClass {
  className: string;
  classLevel: number;
  archetype?: string;
}

// conversion for distance units

// standar dice types
type Dice = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

// abilities
type Abilities =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

//  Skills
type Skills =
  | 'Acrobatics'
  | 'Animal Handling'
  | 'Arcana'
  | 'Athletics'
  | 'Deception'
  | 'History'
  | 'Insight'
  | 'Intimidation'
  | 'Investigation'
  | 'Medicine'
  | 'Nature'
  | 'Perception'
  | 'Performance'
  | 'Persuasion'
  | 'Religion'
  | 'Sleight of Hand'
  | 'Stealth'
  | 'Survival';

interface IName {
  given: string;
  family?: string;
  nicknames?: string;
}

// all proficiencies listed as an array of strings (create a seperate array of strings for **expertise**)
type TProficiencies = string[];

// abilities as an interface
interface IAbility {
  score: number;
  modifier: number;
}

class Ability implements IAbility {
  score: number = 8;
  modifier: number = Math.floor(this.score / 2) - 5;
  constructor(abilityScore: number) {
    this.score = abilityScore;
  }
}

interface IAbilities {
  strength: IAbility;
  dexterity: IAbility;
  constitution: IAbility;
  intelligence: IAbility;
  wisdom: IAbility;
  charisma: IAbility;
}

interface IPlayer {
  name: IName | string;
  campaigns: number[];
  characters: number[];
}

export class Player {
  name: IName;
  campaigns: number[] = [];
  characters: number[] = [];
}

interface ICharacter {
  id: number;
  name: IName;
  level: number;
  xp?: number;
  classes: IClass[];
  background: string;
  race: string;
  alignment: string;
  armourClass: number;
  speed: number;
  abilities: IAbilities;
  proficiencyBonus: number;
}

export class Character implements ICharacter {
  // timestamp character id
  id: number = Date.now();
  name: IName = {
    given: '',
  };
  level: number = 1;
  classes: IClass[] = [{ className: '', classLevel: 1 }];
  background: string = '';
  race: string = '';
  alignment: string = '';
  xp?: number = 0;
  armourClass: number = 0;
  initiative: number = 0;
  speed: number = 0;
  // ability scores and modifiers
  abilities = {
    strength: new Ability(8),
    dexterity: new Ability(8),
    constitution: new Ability(8),
    intelligence: new Ability(8),
    wisdom: new Ability(8),
    charisma: new Ability(8),
  };
  inspiration?: string;
  proficiencyBonus: number = 1 + (this.level + 3) / 4;
  // proficiencies include abilities (saving throws), skills, armours, weapons, shields, etc. Remove Duplicates?
  proficiencies: TProficiencies = [];
  // passive wisdom + perception proficiency
  perception = this.abilities.wisdom.modifier;
  // calculation based on classes levels and their corresponding hit dice
  hitDice?: Dice | Dice[];
  // starting hit points
  health = {
    current: 0,
    temp: 0,
    max: 1,
    deathSaves: {
      success: 0,
      failure: 0,
    },
  };

  constructor(id: number, name: IName | string) {
    this.id = id;
    if (typeof name === 'string') {
      const names = name.split(' ');
      this.name.given = names[0];
      if (names.length > 1) {
        this.name.family = names[names.length - 1];
      }
      if (names.length > 2) {
        this.name.nicknames = names.slice(1, -1).join(' ');
      }
    }
  }
}
