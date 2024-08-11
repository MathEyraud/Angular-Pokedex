import { IAPIResource, IDescription, IFlavorText, IName, INamedAPIResource } from "../utility/common-models/common-models";

export interface IPokemonSpecies {
    base_happiness :           number;
    capture_rate :             number;
    color :                    INamedAPIResource;
    egg_groups :               INamedAPIResource[];
    evolution_chain :          IAPIResource;
    evolves_from_species :     INamedAPIResource;
    flavor_text_entries :      IFlavorText[];
    form_descriptions :        IDescription[];
    forms_switchable :         boolean;
    gender_rate :              number;
    genera :                   IGenus[];
    generation :               INamedAPIResource;
    growth_rate :              INamedAPIResource;
    habitat :                  INamedAPIResource;
    has_gender_differences :   boolean;
    hatch_counter :            number;
    id :                       number;
    is_baby :                  boolean;
    is_legendary :             boolean;
    is_mythical :              boolean;
    name :                     string;
    names :                    IName[];
    order :                    number;
    pal_park_encounters :      IPalParkEncounterArea[];
    pokedex_numbers :          IPokemonSpeciesDexEntry[];
    shape :                    INamedAPIResource;
    varieties :                IPokemonSpeciesVariety[];
}

export interface ILanguageName {
    name: string;
    url: string;
}

export interface IGenus {
    genus: string;
    language: INamedAPIResource;
}

export interface IPalParkEncounterArea {
    base_score: number;
    rate: number;
    area: INamedAPIResource;
}

export interface IPokemonSpeciesDexEntry {
    entry_number: number;
    pokedex: INamedAPIResource;
}

export interface IPokemonSpeciesVariety {
    is_default: boolean;
    pokemon: INamedAPIResource;
}