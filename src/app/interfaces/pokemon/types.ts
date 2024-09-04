import { IGenerationGameIndex, IName, INamedAPIResource } from "../utility/common-models/common-models";

// Interface for Type (main interface for type resource)
export interface IType {
    id                      : number;                   // The identifier for this resource
    name                    : string;                   // The name for this resource
    damage_relations        : ITypeRelations;           // Details of how effective this type is toward others and vice versa
    past_damage_relations   : ITypeRelationsPast[];     // List of details of how effective this type was toward others in previous generations
    game_indices            : IGenerationGameIndex[];   // List of game indices relevant to this type by generation
    generation              : INamedAPIResource;        // The generation this type was introduced in
    move_damage_class       : INamedAPIResource;        // The class of damage inflicted by this type
    names                   : IName[];                  // The name of this resource listed in different languages
    pokemon                 : ITypePokemon[];           // List of details of Pokémon that have this type
    moves                   : INamedAPIResource[];      // List of moves that have this type
}

// Interface for TypePokemon (details of Pokémon that have this type)
export interface ITypePokemon {
    slot: number;
    pokemon: INamedAPIResource; // Reference to a Pokémon resource
}

// Interface for TypeRelations (damage relations for the type)
export interface ITypeRelations {
    no_damage_to        : INamedAPIResource[];  // Types this type has no effect on
    half_damage_to      : INamedAPIResource[];  // Types this type is not very effective against
    double_damage_to    : INamedAPIResource[];  // Types this type is very effective against
    no_damage_from      : INamedAPIResource[];  // Types that have no effect on this type
    half_damage_from    : INamedAPIResource[];  // Types that are not very effective against this type
    double_damage_from  : INamedAPIResource[];  // Types that are very effective against this type
}

// Interface for TypeRelationsPast (damage relations in previous generations)
export interface ITypeRelationsPast {
    generation: INamedAPIResource; // Reference to the last generation for these damage relations
    damage_relations: ITypeRelations; // The damage relations up to and including the listed generation
}