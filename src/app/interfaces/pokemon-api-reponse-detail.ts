import { ISprites } from "./sprites";

export interface IPokemon {
    abilities :                 IAbility[];
    base_experience :           number;
    cries :                     any[];
    forms :                     any[];
    game_indices :              any[];
    height :                    number;
    held_items :                string[];
    id :                        number;
    is_default :                boolean;
    location_area_encounters :  string;
    moves :                     IMove[];
    name :                      string;
    order :                     number;
    past_abilities :            any[];
    past_types :                any[];
    species :                   ISpecies;
    sprites :                   ISprites;
    stats :                     IStat[];
    types :                     IType[];
    weight :                    number;
}

export interface ISpecies {
    name: string;
    url: string;
}

export interface IType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
}

export interface IAbility {

    ability: {
      name: string;
      url: string;
    };
  
    is_hidden: boolean;
    slot: number;
}

export interface IStat {

    base_stat: number;
    effort: number;
  
    stat: {
      name: string;
      url: string;
    };
}

export interface IMove {

    move: {
      name: string;
      url: string;
    };

    version_group_details: Array<{

      level_learned_at: number;

      move_learn_method: {
        name: string;
        url: string;
      };

      version_group: {
        name: string;
        url: string;
      };
    }>;
}