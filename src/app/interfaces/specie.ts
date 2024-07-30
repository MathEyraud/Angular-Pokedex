export interface IPokemonSpecies {
    base_happiness :           number;
    capture_rate :             number;
    color :                    IColor;
    egg_groups :               IEggGroup[];
    evolution_chain :          IEvolutionChain;
    evolves_from_species :     ISpecies;
    flavor_text_entries :      IFlavorTextEntry[];
    form_descriptions :        any[];
    forms_switchable :         boolean;
    gender_rate :              number;
    genera :                   IGenus[];
    generation :               IGeneration;
    growth_rate :              IGrowthRate;
    habitat :                  IHabitat;
    has_gender_differences :   boolean;
    hatch_counter :            number;
    id :                       number;
    is_baby :                  boolean;
    is_legendary :             boolean;
    is_mythical :              boolean;
    name :                     string;
    names :                    IName[];
    order :                    number;
    pal_park_encounters :      IPalParkEncounter[];
    pokedex_numbers :          IPokedexNumber[];
    shape :                    IShape;
    varieties :                IVariety[];
}

export interface IColor {
    name: string;
    url: string;
}

export interface IEggGroup {
    name: string;
    url: string;
}

export interface IEvolutionChain {
    url: string;
}

export interface ISpecies {
    name: string;
    url: string;
}

export interface ILanguage {
    name: string;
    url: string;
}

export interface IVersion {
    name: string;
    url: string;
}

export interface IFlavorTextEntry {
    flavor_text: string;
    language: ILanguage;
    version: IVersion;
}

export interface ILanguageName {
    name: string;
    url: string;
}

export interface IGenus {
    genus: string;
    language: ILanguage;
}

export interface IGeneration {
    name: string;
    url: string;
}

export interface IGrowthRate {
    name: string;
    url: string;
}

export interface IHabitat {
    name: string;
    url: string;
}

export interface IName {
    language: ILanguage;
    name: string;
}

export interface IArea {
    name: string;
    url: string;
}

export interface IPalParkEncounter {
    area: IArea;
    base_score: number;
    rate: number;
}

export interface IPokedex {
    name: string;
    url: string;
}

export interface IPokedexNumber {
    entry_number: number;
    pokedex: IPokedex;
}

export interface IShape {
    name: string;
    url: string;
}

export interface IPokemon {
    name: string;
    url: string;
}

export interface IVariety {
    is_default: boolean;
    pokemon: IPokemon;
}