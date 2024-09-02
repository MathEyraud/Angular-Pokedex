import { IDescription, INamedAPIResource } from "../utility/common-models/common-models";

export interface IGrowthRate {
    id              : number;
    name            : string;
    formula         : string;
    descriptions    : IDescription[];
    levels          : IGrowthRateExperienceLevel[];
    pokemon_species : INamedAPIResource[];
}

export interface IGrowthRateExperienceLevel {
    level       : number;
    experience  : number;
}