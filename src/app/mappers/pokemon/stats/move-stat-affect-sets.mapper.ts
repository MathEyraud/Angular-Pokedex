import { MoveStatAffectSets } from "src/app/models/pokemon/stats/move-stat-affect-sets";
import { MoveStatAffectMapper } from "./move-stat-affect.mapper";
import { IMoveStatAffectSets } from "src/app/interfaces/pokemon/stat";

export class MoveStatAffectSetsMapper {
  
    static mapData(data: IMoveStatAffectSets): MoveStatAffectSets {

        return new MoveStatAffectSets(
            MoveStatAffectMapper.mapDatas(data.increase),
            MoveStatAffectMapper.mapDatas(data.decrease)
        )
    }
}