import { IAPIResource, IName, INamedAPIResource } from "../utility/common-models/common-models";

export interface IStat {
    id                  : number;                   // The identifier for this resource.
    name                : string;                   // The name for this resource.
    game_index          : number;                   // ID the games use for this stat.
    is_battle_only      : boolean;                  // Whether this stat only exists within a battle.
    affecting_moves     : IMoveStatAffectSets;      // A detail of moves which affect this stat positively or negatively.
    affecting_natures   : INatureStatAffectSets;    // A detail of natures which affect this stat positively or negatively.
    characteristics     : IAPIResource[];           // A list of characteristics that are set on a Pokémon when its highest base stat is this stat.
    move_damage_class   : INamedAPIResource;        // The class of damage this stat is directly related to.
    names               : IName[];                  // The name of this resource listed in different languages.
}

export interface IMoveStatAffectSets {
    increase: IMoveStatAffect[];  // A list of moves and how they change the referenced stat positively.
    decrease: IMoveStatAffect[];  // A list of moves and how they change the referenced stat negatively.
}

export interface IMoveStatAffect {
    change  : number;               // The maximum amount of change to the referenced stat.
    move    : INamedAPIResource;    // The move causing the change.
}
  
export interface INatureStatAffectSets {
    increase: INamedAPIResource[];  // A list of natures and how they change the referenced stat positively.
    decrease: INamedAPIResource[];  // A list of natures and how they change the referenced stat negatively.
}