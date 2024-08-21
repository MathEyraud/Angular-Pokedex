import { IEvolutionDetail } from "src/app/interfaces/evolution/evolution-chains";
import { EvolutionDetail } from "src/app/models/evolution/evolution-detail";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class EvolutionDetailMapper {

    static mapToEvolutionDetail(data: IEvolutionDetail): EvolutionDetail {

        return new EvolutionDetail(
            data.item ? ApiRessourceMapper.mapToNamedAPIResource(data.item) : null,                         // _item
            data.trigger ? ApiRessourceMapper.mapToNamedAPIResource(data.trigger) : null,                   // _trigger
            data.gender,                                                                                    // _gender
            data.held_item ? ApiRessourceMapper.mapToNamedAPIResource(data.held_item) : null,               // _heldItem
            data.known_move ? ApiRessourceMapper.mapToNamedAPIResource(data.known_move) : null,             // _knownMove
            data.known_move_type ? ApiRessourceMapper.mapToNamedAPIResource(data.known_move_type) : null,   // _knownMoveType
            data.location ? ApiRessourceMapper.mapToNamedAPIResource(data.location) : null,                 // _location
            data.min_level,                                                                                 // _minLevel
            data.min_happiness,                                                                             // _minHappiness
            data.min_beauty,                                                                                // _minBeauty
            data.min_affection,                                                                             // _minAffection
            data.needs_overworld_rain,                                                                      // _needsOverworldRain
            data.party_species ? ApiRessourceMapper.mapToNamedAPIResource(data.party_species) : null,       // _partySpecies
            data.party_type ? ApiRessourceMapper.mapToNamedAPIResource(data.party_type) : null,             // _partyType
            data.relative_physical_stats,                                                                   // _relativePhysicalStats
            data.time_of_day,                                                                               // _timeOfDay
            data.trade_species ? ApiRessourceMapper.mapToNamedAPIResource(data.trade_species) : null,       // _tradeSpecies
            data.turn_upside_down 
        );
    }
}
    