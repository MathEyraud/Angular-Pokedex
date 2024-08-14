import { INamedAPIResource, IVersionGameIndex } from "../utility/common-models/common-models";
import { IPokemonMove } from "./pokemon-move";
import { IPokemonSprites } from "./pokemon-sprites";

// Interface définissant la structure de la réponse de l'API Pokémon
export interface IPokemonApiResponse {
  count   : number;                               // Nombre total de Pokémon
  next    : string | null;                        // URL pour la page suivante de résultats
  previous: string | null;                        // URL pour la page précédente de résultats
  results : Array<{ name: string; url: string }>; // Liste des Pokémon avec leur nom et URL des détails
}

export interface IPokemon {
  id :                        number;
  name :                      string;
  base_experience :           number;
  height :                    number;
  is_default :                boolean;
  order :                     number;
  weight :                    number;
  abilities :                 IPokemonAbility[];
  forms :                     INamedAPIResource[];
  game_indices :              IVersionGameIndex[];
  held_items :                IPokemonHeldItem[];
  location_area_encounters :  string;
  moves :                     IPokemonMove[];
  past_types :                IPokemonTypePast[];
  sprites :                   IPokemonSprites;
  cries :                     IPokemonCries;
  species :                   INamedAPIResource;
  stats :                     IPokemonStat[];
  types :                     IPokemonType[];
}

export interface IPokemonHeldItem {
  item: INamedAPIResource;
  version_details: IPokemonHeldItemVersion[];
}

export interface IPokemonHeldItemVersion {
  version: INamedAPIResource;
  rarity: number;
}

export interface IPokemonCries {
  latest: string;
  legacy: string;
}

export interface IPokemonType {
  slot: number;
  type: INamedAPIResource;
}

export interface IPokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: INamedAPIResource;
}

export interface IPokemonStat {
  stat: INamedAPIResource
  effort: number;
  base_stat: number;
}

export interface IPokemonTypePast {
  generation: INamedAPIResource;
  types: IPokemonType[];
}