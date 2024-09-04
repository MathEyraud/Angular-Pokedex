import { NatureStatAffectSets } from "src/app/models/pokemon/stats/nature-stat-affect-sets";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { INatureStatAffectSets } from "src/app/interfaces/pokemon/stat";

export class NatureStatAffectSetsMapper {
  
    static mapData(data: INatureStatAffectSets): NatureStatAffectSets {

        return new NatureStatAffectSets(
            ApiRessourceMapper.mapToNamedAPIResources(data.increase),
            ApiRessourceMapper.mapToNamedAPIResources(data.decrease)
        )
    }
}