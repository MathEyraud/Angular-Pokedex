import { INamedAPIResource } from "./api-ressource";

export interface IPokemonMove {
    move                    : INamedAPIResource;
    version_group_details   : IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
    level_learned_at    : number;
    move_learn_method   : INamedAPIResource;
    version_group       : INamedAPIResource;
}