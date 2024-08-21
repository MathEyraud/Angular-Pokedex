import { INamedAPIResource } from "../utility/common-models/common-models";

export interface IEvolutionChain {
    id :                number;
    baby_trigger_item : INamedAPIResource | null;
    chain :             IChainLink;
}
  
export interface IChainLink {
    is_baby :           boolean;
    species :           INamedAPIResource;
    evolution_details : IEvolutionDetail[];
    evolves_to :        IChainLink[];
}
  
export interface IEvolutionDetail {
    item :                      null | INamedAPIResource;
    trigger :                   null | INamedAPIResource;
    gender :                    null | number;
    held_item :                 null | INamedAPIResource;
    known_move :                null | INamedAPIResource;
    known_move_type :           null | INamedAPIResource;
    location :                  null | INamedAPIResource;
    min_level :                 null | number;
    min_happiness :             null | number;
    min_beauty :                null | number;
    min_affection :             null | number;
    needs_overworld_rain :      boolean;
    party_species :             null | INamedAPIResource;
    party_type :                null | INamedAPIResource;
    relative_physical_stats :   null | number;
    time_of_day :               string | null;
    trade_species :             null | INamedAPIResource;
    turn_upside_down :          boolean;
}