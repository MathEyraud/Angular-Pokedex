export interface IEvolutionChain {
    baby_trigger_item : null | INamedAPIResource;
    chain :             IEvolutionChainLink;
    id :                number;
}
  
export interface IEvolutionChainLink {
    evolution_details : IEvolutionDetail[];
    evolves_to :        IEvolutionChainLink[];
    is_baby :           boolean;
    species :           INamedAPIResource;
}
  
export interface IEvolutionDetail {
    gender :                    null | number;
    held_item :                 null | INamedAPIResource;
    item :                      null | INamedAPIResource;
    known_move :                null | INamedAPIResource;
    known_move_type :           null | INamedAPIResource;
    location :                  null | INamedAPIResource;
    min_affection :             null | number;
    min_beauty :                null | number;
    min_happiness :             null | number;
    min_level :                 null | number;
    needs_overworld_rain :      boolean;
    party_species :             null | INamedAPIResource;
    party_type :                null | INamedAPIResource;
    relative_physical_stats :   null | number;
    time_of_day :               string;
    trade_species :             null | INamedAPIResource;
    trigger :                   INamedAPIResource;
    turn_upside_down :          boolean;
}

export interface INamedAPIResource {
    name: string;
    url: string;
}