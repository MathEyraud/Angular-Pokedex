import { Stat } from "src/app/models/pokemon/stats/stat";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { NameMapper } from "../../utility/common-models/name.mapper";
import { MoveStatAffectSetsMapper } from "./move-stat-affect-sets.mapper";
import { NatureStatAffectSetsMapper } from "./nature-stat-affect-sets.mapper";
import { IStat } from "src/app/interfaces/pokemon/stat";

export class StatMapper {
  
    static mapData(data: IStat): Stat {

        return new Stat(
            data.id,
            data.name,
            data.game_index,
            data.is_battle_only,
            MoveStatAffectSetsMapper.mapData(data.affecting_moves),
            NatureStatAffectSetsMapper.mapData(data.affecting_natures),
            ApiRessourceMapper.mapToAPIResources(data.characteristics),
            ApiRessourceMapper.mapToNamedAPIResource(data.move_damage_class),
            NameMapper.mapNames(data.names),
        )
    }
}