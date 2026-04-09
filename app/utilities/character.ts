// DnD character class / description / interface

interface IClass {
  _class: string;
  _level: number;
}

// conversion for distance units

// standar dice types
type Dice = 
  | "d4"
  | "d6"
  | "d8"
  | "d10"
  | "d12"
  | "d20"

// abilities
type Ability =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

// skills
type Skill = 
  | "Acrobatics"
  | "Animal Handling"
  | "Arcana"
  | "Athletics"
  | "Deception"
  | "History"
  | "Insight"
  | "Intimidation"
  | "Investigation"
  | "Medicine"
  | "Nature"
  | "Perception"
  | "Performance"
  | "Persuasion"
  | "Religion"
  | "Sleight of Hand"
  | "Stealth"
  | "Survival"

  interface IName {
    _given: string;
    _family?: string;
    _nickname?: string;
  }

  type TProficiencies = string[];

export class Character {
  // timestamp character id
  _id: number = performance.now()
  _name: IName = {
    _given: ""
  };
  _classes: IClass | IClass[] = { _class: "", _level: 1 };
  _background: string = "";
  _race: string = "";
  _alignment: string = "";
  _xp?: number = 0;
  _armorClass: number = 0;
  _initiative: number = 0;
  _speed: number = 0;
  // ability scores and modifiers
  _abilityScores = {
    _strength: 8,
    _dexterity: 8,
    _constitution: 8,
    _intelligence: 8,
    _wisdom: 8,
    _charisma: 8,
  };
  // ability modifier calculations
  _abilityMods = {
    _strength: (this._abilityScores._strength / 2) - 5,
    _dexterity: (this._abilityScores._dexterity / 2) - 5,
    _constitution:(this._abilityScores._constitution / 2) - 5,
    _intelligence: (this._abilityScores._intelligence / 2) - 5,
    _wisdom: (this._abilityScores._wisdom / 2) - 5,
    _charisma: (this._abilityScores._charisma / 2) - 5,
  }
  _inspiration?: string;
  _proficiencyBonus: number = 2;
  // proficiencies include abilities (saving throws), skills, armours, weapons, shields, etc. Remove Duplicates?
  _proficiencies: TProficiencies = []
  // passive wisdom + perception proficiency
  _perception = this._abilityMods._wisdom;
  // calculation based on classes levels and their corresponding hit dice
  _hitDice?: Dice | Dice[] ;
  // starting hit points
  _health = {
    _current: 0,
    _temp: 0,
    _max: 1,
    _deathSaves: {
      _success: 0,
      _failure: 0,
    }
  };

  constructor(name: IName | string) {

  }
  get name() {
    return this._name
  }
}
