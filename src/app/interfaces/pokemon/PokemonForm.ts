import { IName, INamedAPIResource } from "../utility/common-models/common-models";

// Interface pour PokemonForm
export interface IPokemonForm {
  id            : number;
  name          : string;
  order         : number;
  form_order    : number;
  is_default    : boolean;
  is_battle_only: boolean;
  is_mega       : boolean;
  form_name     : string;
  pokemon       : INamedAPIResource;
  types         : IPokemonFormType[];
  sprites       : IPokemonFormSprites;
  version_group : INamedAPIResource;
  names         : IName[];
  form_names    : IName[];
}

// Interface pour PokemonFormType
export interface IPokemonFormType {
  slot: number;
  type: INamedAPIResource;
}

// Interface pour PokemonFormSprites
export interface IPokemonFormSprites {
  front_default : string | null;
  front_shiny   : string | null;
  back_default  : string | null;
  back_shiny    : string | null;
}