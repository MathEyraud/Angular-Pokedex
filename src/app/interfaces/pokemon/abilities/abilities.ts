import { IName, INamedAPIResource, IVerboseEffect } from "../../utility/common-models/common-models";

// Interface principale pour Ability
export interface IAbility {
  id                    : number;
  name                  : string;
  is_main_series        : boolean;
  generation            : INamedAPIResource;
  names                 : IName[];
  effect_entries        : IVerboseEffect[];
  effect_changes        : IAbilityEffectChange[];
  flavor_text_entries   : IAbilityFlavorText[];
  pokemon               : IAbilityPokemon[];
}

// Interface pour AbilityEffectChange
export interface IAbilityEffectChange {
  effect_entries    : IEffect[];
  version_group     : INamedAPIResource;
}

// Interface pour Effect
export interface IEffect {
  effect    : string;
  language  : INamedAPIResource;
}

// Interface pour AbilityFlavorText
export interface IAbilityFlavorText {
  flavor_text   : string;
  language      : INamedAPIResource;
  version_group : INamedAPIResource;
}

// Interface pour AbilityPokemon
export interface IAbilityPokemon {
  is_hidden : boolean;
  slot      : number;
  pokemon   : INamedAPIResource;
}