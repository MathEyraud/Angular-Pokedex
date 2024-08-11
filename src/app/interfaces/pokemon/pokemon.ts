import { INamedAPIResource } from "../utility/common-models/common-models";
import { IPokemonMove } from "./pokemon-move";
import { IPokemonSprites } from "./pokemon-sprites";

// Interface définissant la structure de la réponse de l'API Pokémon
export interface IPokemonApiResponse {
  count   : number;                               // Nombre total de Pokémon
  next    : string | null;                        // URL pour la page suivante de résultats
  previous: string | null;                        // URL pour la page précédente de résultats
  results : Array<{ name: string; url: string }>; // Liste des Pokémon avec leur nom et URL
}

export interface IPokemon {
  abilities :                 IPokemonAbility[];
  base_experience :           number;
  cries :                     PokemonCries[];
  forms :                     INamedAPIResource[];
  game_indices :              VersionGameIndex[];
  height :                    number;
  held_items :                PokemonHeldItem[];
  id :                        number;
  is_default :                boolean;
  location_area_encounters :  string;
  moves :                     IPokemonMove[];
  name :                      string;
  order :                     number;
  past_types :                IPokemonTypePast[];
  species :                   INamedAPIResource;
  sprites :                   IPokemonSprites;
  stats :                     IPokemonStat[];
  types :                     IPokemonType[];
  weight :                    number;
}

export interface PokemonHeldItem {
  item: INamedAPIResource;
  version_details: PokemonHeldItemVersion;
}

export interface PokemonHeldItemVersion {
  version: INamedAPIResource;
  rarity: number;
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface IPokemonType {
  slot: number;
  type: INamedAPIResource;
}

export interface VersionGameIndex {
  game_index: number;
  version: INamedAPIResource;
}

export interface IPokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: INamedAPIResource;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: INamedAPIResource
}

export interface IPokemonTypePast {
  generation: INamedAPIResource;
  types: IPokemonType[];
}