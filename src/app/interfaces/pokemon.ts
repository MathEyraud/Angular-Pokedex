import { IPokemonMove } from "./move-pokemon";
import { ISprites } from "./sprites";

// Interface définissant la structure de la réponse de l'API Pokémon
export interface IPokemonApiResponse {
  count   : number;                               // Nombre total de Pokémon
  next    : string | null;                        // URL pour la page suivante de résultats
  previous: string | null;                        // URL pour la page précédente de résultats
  results : Array<{ name: string; url: string }>; // Liste des Pokémon avec leur nom et URL
}

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
  moves :                     IPokemonMove[];
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