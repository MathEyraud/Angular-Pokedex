import { MoveStatAffect } from "src/app/models/pokemon/stats/move-stat-affect";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { IMoveStatAffect } from "src/app/interfaces/pokemon/stat";

export class MoveStatAffectMapper {
  
    static mapData(data: IMoveStatAffect): MoveStatAffect {

        return new MoveStatAffect(
            data.change,
            ApiRessourceMapper.mapToNamedAPIResource(data.move)
        );
    }

    static mapDatas(data: IMoveStatAffect[]): MoveStatAffect[] {
        return data.map(MoveStatAffectMapper.mapData);
    }
}