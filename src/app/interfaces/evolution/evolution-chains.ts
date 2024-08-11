import { INamedAPIResource } from "../utility/common-models/common-models";

export interface IEvolutionChain {
    baby_trigger_item : INamedAPIResource |null;
    chain :             IChainLink;
    id :                number;
}
  
export interface IChainLink {
    evolution_details : IEvolutionDetail[];
    evolves_to :        IChainLink[];
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